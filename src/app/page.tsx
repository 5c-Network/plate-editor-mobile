/* eslint-disable prettier/prettier */
//@ts-nocheck
'use client'

import { PlateEditor } from '@/components/plate-editor';
import { getRuleName } from '@/utils/helpers';
import { useEffect, useRef, useState } from 'react';
import { updateReworkReportEditTracker } from '../utils/helpers';

export default function IndexPage() {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const [study_id,setStudyId]=useState(urlParams.get('study_id'))
  const [rad_id,setRadId]=useState(urlParams.get('rad_id'))
  const [rework_id,setReworkId]=useState(urlParams.get('rework_id'))
  const [report_id,setReportId]=useState(urlParams.get('report_id'))
  const [editorValue,setEditorValue]=useState<Array<Node>>([])
  const [rule,setRule]=useState<Array<Node>>([])
  const [isReportEdit, setIsReportEdit] = useState<boolean>(false);

  const savingStatusTimerRef=useRef<any>()

  useEffect(()=>{
    fetch(`https://e2e-staging-api.5cnetwork.com/study/${study_id}?rework_id=${rework_id}`,{method:'GET'})
    .then((response)=> response.json())
    .then((data)=>{
      const reportToEdit=data?.reports?.find((report:any)=> {return report.id=== +report_id! })
      setEditorValue(reportToEdit?.json)
      setRule(reportToEdit?.rule)
    })
  },[])



  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const updateSavingStatus = async(status:string) =>{
    setSavingStatus(status)
  }

  const saveReportChanges = async (report_json) => {
    setEditorValue(report_json)
    await updateSavingStatus('saving')
     const dataToUpdate= {
      json:report_json,
      study_id: +study_id!,
      rad_id:+rad_id!,
      name:getRuleName(rule),
      rule,
      id: +report_id!, 
    }
    await fetch('https://e2e-staging-api.5cnetwork.com/report',{
      method:'POST',
      headers: {
      'Content-Type': 'application/json' 
      },
      body:JSON.stringify(dataToUpdate)
  })
  try {
    !isReportEdit && updateReworkReportEditTracker({
      rad_id: +rad_id,
      rework_id: +rework_id,
      report_id: +report_id,
      mod_study: getRuleName(rule)
    })
    setIsReportEdit(true)
  } catch (error) {
    console.log(error)
  }

  await updateSavingStatus('saved')
  if(savingStatusTimerRef.current){
    clearTimeout(savingStatusTimerRef.current)
  }
  savingStatusTimerRef.current = setTimeout(() => {
    setSavingStatus('');
  }, 3000);
  }

  const saveDebounce = debounce(saveReportChanges,1000)
const handleOnchangeEditorValue =(value:any) =>{
  saveDebounce(value)
}

const [savingStatus, setSavingStatus] = useState('');

const handleSave = () => {
  setSavingStatus('saving');
  setTimeout(() => {
    setSavingStatus('saved');
    setTimeout(() => {
      setSavingStatus('');
    }, 3000);
  }, 3000);
};



useEffect(()=>{ handleSave()},[])
  if(editorValue?.length ==0){
    return (
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full flex items-center">
          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <span className="mr-2">Loading...</span>
        </div>
    );
  }


  return (
    <section>
      <div className="w-[1/1]">
        <PlateEditor editorValue={editorValue as any} handleOnchangeEditorValue={handleOnchangeEditorValue} saveReportChanges={saveReportChanges}/>
      </div>
      {/* ------saving ui ----------- */}
      <>
      {savingStatus === 'saving' && (
        <div className="fixed bottom-0 right-1 bg-white text-gray-700 px-1 py-1 flex items-center">
          <div className="w-3 h-3 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span className='text-xs'>Saving...</span>
        </div>
      )}
      {savingStatus === 'saved' && (
        <div className="fixed bottom-0 right-1 bg-white text-gray-700 px-1 py-1 flex items-center">
          <svg className="w-3 h-3 text-blue-500 mr-1" fill="green" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className='text-xs'>Saved</span>
        </div>
      )}
    </>

    </section>
  );
}
