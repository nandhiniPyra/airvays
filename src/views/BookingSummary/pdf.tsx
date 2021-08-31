import React from 'react';

export default (props:any) => {
  const bodyRef:any = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  console.log(bodyRef,"bodyRef")
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
        <button onClick={createPdf}>Create PDF</button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}