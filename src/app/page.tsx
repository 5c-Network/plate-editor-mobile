'use client'
import { PlateEditor } from '@/components/plate-editor';
import { getRuleName } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const urlParams = new URLSearchParams(window.location.search)

  const [study_id,setStudyId]=useState(urlParams.get('study_id'))
  const [rad_id,setRadId]=useState(urlParams.get('rad_id'))
  const [rework_id,setReworkId]=useState(urlParams.get('rework_id'))
  const [report_id,setReportId]=useState(urlParams.get('report_id'))

  const [editorValue,setEditorValue]=useState<Array<Node>>([])
  const [rule,setRule]=useState<Array<Node>>([])

  useEffect(()=>{
    fetch(`https://e2e-sandbox-api.5cnetwork.com/study/${study_id}?rework_id=${rework_id}`,{method:'GET'})
    .then((data)=> data.json())
    .then((data2)=>{
      console.log(data2)
   const  reportToEdit=data2?.reports?.find((report:any)=> {return report.id=== +report_id! })
      setEditorValue(reportToEdit?.json)
      setRule(reportToEdit?.rule)
    })
  },[])

  const handleOnchangeEditorValue =(value:any) =>{
    setEditorValue(value)
  }

  const saveReportChanges = async () => {
    console.log("save function called")
   const data3= {
      json:editorValue,
      study_id: +study_id!,
      rad_id:+rad_id!,
      name:getRuleName(rule),
      rule,
      id: +report_id!,
      // rework_id: +rework_id!,
      // lang_code: 'en' 
    }
    await fetch('https://e2e-sandbox-api.5cnetwork.com/report',{
      method:'POST',
      headers: {
      'Content-Type': 'application/json' // Set content type to JSON
      },
      body:JSON.stringify(data3)
  })
  }

  return (
    <section>
      <div className="w-[1/1]">
        <PlateEditor editorValue={editorValue} handleOnchangeEditorValue={handleOnchangeEditorValue} saveReportChanges={saveReportChanges}/>
      </div>
    </section>
  );
}
