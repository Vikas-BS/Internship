import { useState } from 'react'
import Accordion from './Accordion'
import faq from './faq'
import './App.css'

function App() {
return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: 'black' }}>
      <h1>FAQs</h1>
      {faq.map((item) => (
        <Accordion key={item.id} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

export default App
