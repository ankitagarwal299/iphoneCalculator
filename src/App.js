import React, { useState ,useEffect} from 'react';
import './style.css';
import Buttons from './components/Buttons';
import commafy from './utils/commafy';

//https://www.youtube.com/watch?v=wOENJWPu23U&list=PLXzMwWvud3xTDnq8jXF9-utSr0MP5ZLPu

export default function App() {
  const [value, setValue] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [time, setTime] = useState(new Date());



    /**Th9ings to remember */
    /*
    a.time -> useEffect and track new Date().getMinutes()
              new Date().getMinutes().toString().padStart(2,"0")
    
    b. memory -> save value in memory after clicking  operator
                 initialize with null
                 save parseFloat into memory

    c. operator (/+-*)-> save  operator
              initialize with null
              save operator after clicking  operator
              Set operator
              Set value to memory
              Reset value to 0
        op (=):
           Set & calculate VALUE based on opeartor selected
           Reset operator
           Reset memory
           

    d. setValue -> save  value in state
          initialize with "0"
          convert toString while saving in setValue
          convert to parseFloat when getting and manipulating

    e. decimal -> check value contains "."
                    -already decimal then return
                    -otherwise add "." then return

    f. comma separate digits , create util
    */



  useEffect(() => {
    setTime(new Date());
  }, [new Date().getMinutes()]);

  function continuosOperations(){
    switch(operator){
      case '+':
        setMemory(parseFloat(value) + memory);
        break;
      case '-':
        setMemory(memory - parseFloat(value));
        break;
      case '*':
        setMemory(parseFloat(value) * memory);
        break;
      case '÷':
        setMemory(memory / parseFloat(value) );
        break;
    }
  }




  function handlePress(content) {
    //const num = parseFloat(value); //convert display value from String to Float to easy perform operations

    if (content == 'AC') {
      setValue('0');
      setMemory(null)
      return;
    }

    if (content == '±') {
      const num = parseFloat(value);
      setValue((num * -1).toString());
      return;
    }

    if (content == '%') {
      const num = parseFloat(value);
      setValue((num / 100).toString());
      setMemory(null)
      return;
    }

    
    if (content == '.') { /* Handle decimal */
      if(value.includes(".")) return;

      setValue(value + ".");
      return;
    }


    if (content == '+') {
      if(operator != null){
        continuosOperations()
      }else{
        setMemory(parseFloat(value))
      }
      
      setValue("0");
      setOperator('+')
      return;
    }


    if (content == '-') {
      if(operator!=null){
        continuosOperations()
      }else{
        setMemory(parseFloat(value))
      }

      setValue("0");
      setOperator('-')
      return;
    }


    if (content == '*') {
      if(operator!=null){
        continuosOperations()
      }else{
        setMemory(parseFloat(value))
      }

      setValue("0");
      setOperator('*')
      return;
    }


    if (content == '÷') {
     if(operator!=null){
        continuosOperations()
      }else{
        setMemory(parseFloat(value))
      }
      setValue("0");
      setOperator('÷')
      return;
    }


    if (content == '=') {
      if(!operator) return;


      switch(operator){
        case '+':
          setValue((parseFloat(value) + memory).toString());
          break;
        case '-':
          setValue((memory - parseFloat(value)) .toString());
          break;
        case '*':
          setValue((parseFloat(value) * memory).toString());
          break;
        case '÷':
          setValue((memory / parseFloat(value) ).toString());
          break;
      }
      setMemory(null)
      setOperator(null)
      return;
    }


    //setValue(value + content);//Final value
    setValue(value + content);//Final value
    
  }

  return (
    <div className="App">
      <div className="top">
        { time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}
        </div>
      
      <div className="display">{commafy(value)}</div>

      <div className="buttons">
        <Buttons onButtonClick={(val) => {handlePress(val)}} content="AC" type="function"/>
        <Buttons onButtonClick={(val) => {handlePress(val)}} content="±" type="function"/>
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="%" type="function"/>
        <Buttons onButtonClick={(val) => { handlePress(val)}} content="÷" type="operator"/>

        <Buttons onButtonClick={(val) => { handlePress(val)}}content="7"/>
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="8" />
        <Buttons  onButtonClick={(val) => { handlePress(val)}} content="9"/>
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="*" type="operator" />

        <Buttons  onButtonClick={(val) => { handlePress(val) }} content="4" />
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="5" />
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="6"/>
        <Buttons onButtonClick={(val) => { handlePress(val)}} content="-" type="operator"/>

        <Buttons onButtonClick={(val) => { handlePress(val) }}  content="1" />
        <Buttons onButtonClick={(val) => { handlePress(val) }} content="2" />
        <Buttons onButtonClick={(val) => { handlePress(val)}} content="3" />
        <Buttons onButtonClick={(val) => { handlePress(val)}} content="+" type="operator"/>

        <Buttons onButtonClick={(val) => {handlePress(val)}} content="0"/>
        <Buttons onButtonClick={(val) => { handlePress(val)}} content="." />
        <Buttons onButtonClick={(val) => {handlePress(val)}} content="=" type="operator"/>
      </div>

     
    </div>
  );
}
