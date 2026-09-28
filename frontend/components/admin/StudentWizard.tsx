"use client";
import { useState } from "react";
import { Check, Upload } from "lucide-react";
import { PageCard, Field, inputCls } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

const STEPS = ["Personal Info", "Residence Address", "Emergency Contact", "Preferences", "Educational Information", "Documents"];

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-start justify-between gap-1 px-2 py-2">
      {STEPS.map((s, i) => {
        const n = i + 1;
        const done = n < step;
        const cur = n === step;
        return (
          <div key={s} className="flex flex-1 items-start">
            <div className="flex w-full flex-col items-center text-center">
              <span className={cn("grid size-10 place-items-center rounded-full border-2", done ? "border-sky-600 bg-sky-600 text-white" : cur ? "border-sky-600 text-sky-600" : "border-slate-200 text-slate-400")}>
                {done ? <Check className="size-5" /> : <span className="text-sm font-bold">{n}</span>}
              </span>
              <span className={cn("mt-1 text-[12.5px]", cur ? "font-semibold text-sky-600" : done ? "font-medium" : "text-slate-500")}>{s}</span>
            </div>
            {n < STEPS.length && <span className={cn("mt-5 h-0.5 flex-1", n < step ? "bg-sky-600" : "bg-slate-200")} />}
          </div>
        );
      })}
    </div>
  );
}

export function StudentWizard() {
  const [step, setStep] = useState(1);
  const [same, setSame] = useState(false);
  const [edu, setEdu] = useState(false);

  return (
    <div className="p-4">
      <PageCard>
        <div className="flex items-center justify-between p-5 pb-0">
          <h1 className="text-[22px] font-bold">Add New Student</h1>
          <span className="text-[13px] text-slate-500">Step {step} of 6</span>
        </div>
        <div className="px-5 py-4"><Stepper step={step} /></div>
        <div className="border-t p-5">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-[14px]">Complete student profile by entering personal information such as name, address, date of birth and country of citizenship.</p>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Country of Citizenship" required><select className={inputCls}><option>Select</option><option>Bangladesh</option></select></Field>
                <Field label="Passport Number" required><input className={inputCls} /></Field>
                <Field label="Passport Expiry Date"><input type="date" className={inputCls} /></Field>
                <Field label="Title"><select className={inputCls}><option>Select</option><option>Mr</option><option>Ms</option></select></Field>
                <Field label="First Name" required><input className={inputCls} /></Field>
                <Field label="Middle Name"><input className={inputCls} /></Field>
                <Field label="Last Name" required><input className={inputCls} /></Field>
                <Field label="Date of Birth" required><input type="date" className={inputCls} /></Field>
                <Field label="Gender" required>
                  <div className="flex gap-4 py-2.5 text-sm"><label className="flex items-center gap-1.5"><input type="radio" name="g" /> Male</label><label className="flex items-center gap-1.5"><input type="radio" name="g" /> Female</label><label className="flex items-center gap-1.5"><input type="radio" name="g" /> Other</label></div>
                </Field>
                <Field label="Marital Status" required><select className={inputCls}><option>Select</option></select></Field>
                <Field label="Email Address" required><input className={inputCls} /></Field>
                <Field label="Contact Number" required><input placeholder="01XXXXXXXXX" className={inputCls} /></Field>
                <Field label="First Language"><select className={inputCls}><option>Select language</option></select></Field>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-[14px]">Provide student&apos;s residential address as per passport, and if different, specify it in the mailing address section.</p>
              <h4 className="font-semibold text-sky-600">Permanent Address</h4>
              <div className="grid gap-4 md:grid-cols-[1fr_300px]">
                <Field label="Address" required className="md:col-span-1"><input className={inputCls} /></Field>
                <Field label="Country" required><select className={inputCls}><option>United States</option><option>Bangladesh</option></select></Field>
                <Field label="Province/State" required><select className={inputCls}><option>Select</option></select></Field>
                <Field label="City/Town" required><select className={inputCls}><option>Select province/state first</option></select></Field>
                <Field label="Postal/Zip Code"><input className={inputCls} /></Field>
              </div>
              <h4 className="flex items-center gap-2 font-semibold text-sky-600">Current Address (Mailing Address)
                <label className="flex items-center gap-1.5 text-[13px] font-normal text-slate-700"><input type="checkbox" checked={same} onChange={(e) => setSame(e.target.checked)} /> Same as Above/Permanent address</label>
              </h4>
              {!same && (
                <div className="grid gap-4 md:grid-cols-[1fr_300px]">
                  <Field label="Address" required><input className={inputCls} /></Field>
                  <Field label="Country" required><select className={inputCls}><option>Select</option></select></Field>
                  <Field label="Province/State" required><select className={inputCls}><option>Select</option></select></Field>
                  <Field label="City/Town" required><select className={inputCls}><option>Select province/state first</option></select></Field>
                  <Field label="Postal/Zip Code"><input className={inputCls} /></Field>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-[14px]">Enter emergency contact details of a person to serve as referral for any emergency situations.</p>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Name" required><input className={inputCls} /></Field>
                <Field label="Relation" required><select className={inputCls}><option>Select</option></select></Field>
                <Field label="Email Address"><input className={inputCls} /></Field>
                <Field label="Phone Number" required><input placeholder="01XXXXXXXXX" className={inputCls} /></Field>
                <Field label="Address" className="md:col-span-2"><textarea rows={3} className={inputCls} /></Field>
              </div>
              <p className="text-[12.5px] text-slate-500">Phone number should not be same as registered phone number.</p>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-[14px]">Specify student&apos;s preference for institution, Program, country, Loan, Accommodation, and ancillary services.</p>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Preferred Country"><select className={inputCls}><option>Select country</option></select></Field>
                <Field label="Preferred Level of Education"><select className={inputCls}><option>Select level</option></select></Field>
                <Field label="Preferred College/Institution"><select className={inputCls}><option>Select institution</option></select></Field>
                <Field label="Preferred Program"><select className={inputCls}><option>Select institution first</option></select></Field>
                <Field label="Loan" required><select className={inputCls}><option>Select</option></select></Field>
                <Field label="Accommodation" required><select className={inputCls}><option>Select</option></select></Field>
                <Field label="Ancillary Services"><select className={inputCls}><option>Select</option></select></Field>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-[14px]">Add the student&apos;s academic qualifications and results.</p>
              <div className="flex items-start justify-between">
                <div><h4 className="font-semibold text-sky-600">Educational Information</h4><p className="text-[13px] text-slate-500">Add each completed qualification separately.</p></div>
                <button onClick={() => setEdu(true)} className="rounded-lg border px-3 py-2 text-sm font-medium">+ Add Education</button>
              </div>
              {!edu ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-[13.5px] text-slate-500">No education added yet. Click Add Education to add a qualification.</div>
              ) : (
                <PageCard className="p-4">
                  <h4 className="font-bold">Education 1</h4>
                  <div className="mt-3 grid gap-4 md:grid-cols-3">
                    <Field label="Country of Education" required><select className={inputCls}><option>Select country</option></select></Field>
                    <Field label="Qualification Level" required><select className={inputCls}><option>Select level</option></select></Field>
                    <Field label="Grading Scheme" required><select className={inputCls}><option>Select scheme</option></select></Field>
                    <Field label="Result" required><input className={inputCls} /></Field>
                    <Field label="Institution Name" required><input className={inputCls} /></Field>
                    <Field label="Year of Graduation" required><select className={inputCls}><option>Select</option></select></Field>
                  </div>
                </PageCard>
              )}
            </div>
          )}
          {step === 6 && (
            <div className="space-y-4">
              <p className="text-[14px]">Upload the student&apos;s passport copy, photo, and academic transcript. You can add more documents later from the student&apos;s profile.</p>
              <div className="flex items-center justify-between">
                <div><h4 className="font-semibold text-sky-600">Required Documents</h4><p className="text-[13px] text-slate-500">Upload the common student documents below.</p></div>
                <button className="rounded-lg border px-3 py-2 text-sm font-medium">+ Add More</button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {["Passport Copy", "Photo", "Academic Transcript"].map((d) => (
                  <div key={d}>
                    <div className="mb-1.5 text-[13.5px] font-semibold">{d}</div>
                    <div className="grid place-items-center rounded-lg border border-dashed bg-slate-50 p-8 text-center">
                      <Upload className="size-5 text-slate-400" />
                      <div className="mt-1 text-[13.5px] font-semibold">Click or drag a file here</div>
                      <div className="text-[12px] text-slate-500">PDF or image, up to 5 MB</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[12.5px] text-slate-500">Documents are optional here — you can also upload or update them later from the student&apos;s profile.</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t p-4">
          <button className="rounded-lg border px-4 py-2 text-sm font-medium">Cancel</button>
          <button className="rounded-lg border px-4 py-2 text-sm font-medium">Draft</button>
          {step > 1 && <button onClick={() => setStep((s) => s - 1)} className="rounded-lg border px-4 py-2 text-sm font-medium">Previous</button>}
          {step < 6 ? (
            <button onClick={() => setStep((s) => s + 1)} className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Save & Next</button>
          ) : (
            <>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium">Create Profile</button>
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Create and Send Account Details</button>
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Create Profile and Apply</button>
            </>
          )}
        </div>
      </PageCard>
    </div>
  );
}
