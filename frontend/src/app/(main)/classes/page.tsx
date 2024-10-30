"use client";
import CalenderLine from "@/components/calenderLine/calender-line";
import ListClass from "@/components/listClass/list-class";

export default function ClassesPage() {

  return (
    <>
      <section className="bg-[#F9F9F9] flex-1 font-semibold text-sm">
        <CalenderLine />

        <ListClass />
      </section>
    </>
  )
}