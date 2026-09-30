import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();
  try {
    // Roles
    for (const name of ['ADMIN', 'STUDENT', 'AGENT', 'INSTITUTION_STAFF']) {
      await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
    }
    const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: 'ADMIN' } });

    // Admin user
    const hash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@globaledge.com' },
      update: {},
      create: { email: 'admin@globaledge.com', password: hash, roleId: adminRole.id },
    });
    await prisma.adminUser.upsert({
      where: { userId: admin.id },
      update: {},
      create: { userId: admin.id, firstName: 'Tausif Islam', lastName: 'Sheik' },
    });

    // Master data
    for (const [name, iso, dest] of [
      ['Malaysia', 'MY', true], ['United Kingdom', 'GB', true], ['United States', 'US', true],
      ['Canada', 'CA', true], ['Thailand', 'TH', true], ['United Arab Emirates', 'AE', true],
      ['Bangladesh', 'BD', false],
    ] as const) {
      await prisma.country.upsert({ where: { isoCode: iso }, update: {}, create: { name, isoCode: iso, isDestination: dest } });
    }
    for (const [code, symbol, rate] of [['USD', '$', 1], ['MYR', 'RM', 4.7], ['BDT', '৳', 117], ['AED', 'د.إ', 3.67]] as const) {
      await prisma.currency.upsert({ where: { code }, update: {}, create: { code, symbol, exchangeRate: rate } });
    }
    for (const [name, order] of [
      ['Applied', 1], ['Under Review', 2], ['Offer Received', 3], ['Visa Processing', 4], ['Approved', 5], ['Rejected', 6],
    ] as const) {
      await prisma.applicationStage.upsert({ where: { name }, update: {}, create: { name, order } });
    }
    for (const [name, order] of [
      ['Foundation / Pre-University', 1], ['Diploma', 2], ['Associate Degree', 3],
      ["Bachelor's Degree (Undergraduate)", 4], ['Certificate', 5],
      ["Master's Degree (Postgraduate)", 6], ['PhD (Doctorate)', 7], ['Professional Degree (MBBS, LLB etc)', 8],
    ] as const) {
      await prisma.degreeLevel.upsert({ where: { name }, update: {}, create: { name, order } });
    }

    // Universities + programs
    const uniSeed: { name: string; iso: string; location: string; website: string }[] = [
      { name: 'Krirk University', iso: 'TH', location: 'Bang Khen, Bangkok, Thailand', website: 'https://www.krirk.ac.th/en/' },
      { name: 'Lincoln University College', iso: 'MY', location: 'Petaling Jaya, Selangor, Malaysia', website: 'https://www.lincoln.edu.my/' },
      { name: 'Management & Science University (MSU)', iso: 'MY', location: 'Shah Alam, Selangor, Malaysia', website: 'https://www.msu.edu.my/' },
      { name: 'Asia Pacific University (APU)', iso: 'MY', location: 'Kuala Lumpur, Malaysia', website: 'https://www.apu.edu.my/' },
      { name: 'INTI International University', iso: 'MY', location: 'Nilai, Negeri Sembilan, Malaysia', website: 'https://www.inti.edu.my/' },
      { name: 'SEGi University & Colleges', iso: 'MY', location: 'Petaling Jaya, Selangor, Malaysia', website: 'https://www.segi.edu.my/' },
    ];
    for (const u of uniSeed) {
      const country = await prisma.country.findUniqueOrThrow({ where: { isoCode: u.iso } });
      const found = await prisma.university.findFirst({ where: { name: u.name } });
      if (found) {
        await prisma.university.update({ where: { id: found.id }, data: { status: 'ACTIVE', website: u.website, location: u.location } });
      } else {
        await prisma.university.create({ data: { name: u.name, countryId: country.id, location: u.location, website: u.website, status: 'ACTIVE' } });
      }
    }
    const bachelor = await prisma.degreeLevel.findUniqueOrThrow({ where: { name: "Bachelor's Degree (Undergraduate)" } });
    const underReview = await prisma.applicationStage.findFirst({ where: { name: 'Under Review' } });
    const jan2026 = await prisma.intake.upsert({
      where: { name_year: { name: 'January', year: 2026 } },
      update: {},
      create: { name: 'January', month: 1, year: 2026 },
    });
    const msu = await prisma.university.findFirst({ where: { name: { contains: 'Management & Science' } } });
    if (msu) {
      const existing = await prisma.program.findFirst({ where: { universityId: msu.id, name: 'Bachelor in Computer Science (Hons)' } });
      if (!existing) {
        await prisma.program.create({
          data: {
            universityId: msu.id, degreeLevelId: bachelor.id, name: 'Bachelor in Computer Science (Hons)',
            level: "Bachelor's Degree (Undergraduate)", duration: '3 Years', tuitionFee: 25863,
            applicationFee: 0, deposit: 29356, currency: 'MYR', processingTime: '4-6 Week',
            programIntakes: { create: { intakeId: jan2026.id } },
          },
        });
      }
    }

    // Demo student + application (passport A1234567) for tracking demo
    const studentRole = await prisma.role.findUniqueOrThrow({ where: { name: 'STUDENT' } });
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo.student@example.com' },
      update: {},
      create: { email: 'demo.student@example.com', password: await bcrypt.hash('demo1234', 10), roleId: studentRole.id },
    });
    const demoStudent = await prisma.student.upsert({
      where: { userId: demoUser.id },
      update: { passportNumber: 'A1234567' },
      create: { userId: demoUser.id, firstName: 'Demo', lastName: 'Student', email: demoUser.email, country: 'Bangladesh', passportNumber: 'A1234567' },
    });
    if (msu && underReview) {
      const prog = await prisma.program.findFirst({ where: { universityId: msu.id } });
      if (prog) {
        const has = await prisma.application.findFirst({ where: { studentId: demoStudent.id, programId: prog.id } });
        if (!has) {
          await prisma.application.create({
            data: {
              studentId: demoStudent.id, universityId: msu.id, programId: prog.id,
              intakeId: jan2026.id, stageId: underReview.id, status: 'UNDER_REVIEW',
            },
          });
        }
      }
    }
    console.log('Seeded admin@globaledge.com / admin123 + catalog + demo A1234567');
  } catch (e) { console.log('Seed failed:', (e as Error).message); }
  finally { await prisma.$disconnect(); }
}
main().then(() => process.exit(0)).catch(() => process.exit(1));
