"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { PageCard, inputCls } from "@/components/admin/admin-ui";
import { faculties as seed, studyLevels, durations } from "@/components/admin/admin-lists";

function EditableList({ title, desc, items, placeholder }: { title: string; desc: string; items: string[]; placeholder?: string }) {
  const [list, setList] = useState(items);
  const [val, setVal] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");
  return (
    <div className="mx-auto max-w-[880px] p-4">
      <h1 className="text-[24px] font-bold">{title}</h1>
      <p className="text-[13.5px] text-slate-500">{desc}</p>
      <PageCard className="mt-4 space-y-2.5 p-4">
        {list.map((x, i) => (
          <div key={x + i} className="flex items-center gap-2 rounded-lg border px-4 py-3">
            {edit === i ? (
              <>
                <input value={editVal} onChange={(e) => setEditVal(e.target.value)} className={inputCls} />
                <button onClick={() => { setList((p) => p.map((v, j) => (j === i ? editVal || v : v))); setEdit(null); }} className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white">Save</button>
                <button onClick={() => setEdit(null)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
              </>
            ) : (
              <>
                <span className="flex-1 text-[14px] font-medium">{x}</span>
                <button onClick={() => { setEdit(i); setEditVal(x); }} className="p-1.5" aria-label="edit"><Pencil className="size-4" /></button>
                <button onClick={() => setList((p) => p.filter((_, j) => j !== i))} className="p-1.5 text-red-500" aria-label="delete"><Trash2 className="size-4" /></button>
              </>
            )}
          </div>
        ))}
        {placeholder && (
          <div className="flex gap-2">
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder={placeholder} className={inputCls} />
            <button onClick={() => { if (val.trim()) { setList((p) => [...p, val.trim()]); setVal(""); } }} className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium text-slate-500"><Plus className="size-4" /> Add</button>
          </div>
        )}
      </PageCard>
    </div>
  );
}

export function FacultiesList() {
  return <EditableList title="Faculties" desc="Manage the shared list of faculties available when creating or editing a program." items={seed} />;
}
export function LevelsList() {
  return <EditableList title="Study Levels" desc="Manage the shared list of study levels (degree levels) available when creating or editing a program." items={studyLevels} placeholder="e.g. Master's Degree (Postgraduate)" />;
}
export function DurationsList() {
  return <EditableList title="Durations" desc="Manage the shared list of durations available when creating or editing a program." items={durations} />;
}
