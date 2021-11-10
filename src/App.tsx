import React, {Fragment, useEffect, useState} from 'react';
import './App.scss';

interface LetterObject {
  [keys : string]: number
}

export const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [objectOfLetters, setObjectOfLetters] = useState<LetterObject>({})
  const [sortBy, setSortBy] = useState<string>('')

  useEffect(() => {
    const objectLetters: LetterObject = {}

    for (let letter of inputText) {
      if (!objectLetters[letter]) {
        objectLetters[letter] = 1
      } else {
        objectLetters[letter] += 1;
      }
    }

    if(sortBy) {
      let ordered = Object.keys(objectLetters).sort((a, b) => {
        switch (sortBy) {
          case 'letter':
            return a.localeCompare(b);
          case 'count':
            return objectLetters[a] - objectLetters[b]
          default:
            return 0;
        }
      }).reduce(
        (obj, key) => {
          // @ts-ignore
          obj[key] = objectLetters[key];
          return obj;
        },
        {}
      );

      return setObjectOfLetters(ordered)
    }

    setObjectOfLetters(objectLetters)
  }, [sortBy, inputText])

  return (
   <>
     <input type="text" value={inputText} onChange={event => {
       setInputText(event.target.value.replace(/[^0-9^A-zА-яё\s]/g, ''));
     }}/>
     <table className="table">
       <thead>
         <tr className="table__row">
           <th onClick={() => setSortBy('letter')} className="table__cell">Letter</th>
           <th onClick={() => setSortBy('count')} className="table__cell">Count</th>
           <th className="table__cell">%</th>
         </tr>
       </thead>
       <tbody>
         {
           Object.keys(objectOfLetters).map((letter: string)=>{
             return (
               <Fragment key={letter}>
                 <tr className="table__row">
                   <td className="table__cell">
                     {letter}
                   </td>
                   <td className="table__cell">
                     {objectOfLetters[letter]}
                   </td>
                   <td className="table__cell">
                     {(objectOfLetters[letter] / Object.values(objectOfLetters).reduce((a, b) => a + b, 0) * 100).toFixed(2)}
                   </td>
                 </tr>
               </Fragment>
             )
           })
         }
       </tbody>
     </table>
   </>

  );
}

export default App;
