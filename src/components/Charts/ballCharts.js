import React from 'react'
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import words from "./words";

  function BallCharts() {
    return (
        <>  
        <div style={{ height: 300, width:'100%'}}>
            <ReactWordcloud words={words} />
        </div>
        </>
    )
  }

export default BallCharts