import { useCallback, useState ,useEffect , useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numericAllowed, setNumericAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numericAllowed) {
      str = str+"0123456789";
    }
    if (specialCharAllowed) {
      str = str+ "!@#$%&*?/-_.";
    }
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(index);
    }
    setPassword(pass);

  }, [length, numericAllowed, specialCharAllowed, setPassword]);
  

  const passwordReference=useRef(null);
  const copyPassword =useCallback(()=>{
    passwordReference.current?.select()
    passwordReference.current?.setSelectionRange(0,70)
  window.navigator.clipboard.writeText(password);


  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,specialCharAllowed,numericAllowed,passwordGenerator])
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-3xlg rounded-xlg px-4 my-60 text-white bg-gray-600">
        <h1 className='text-white text-center my-3 '>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordReference}
            readOnly
          />
          <button  onClick={copyPassword} className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700">
            copy
            </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={0}
            max={70}
            value={length}
            className='cursor-pointer'
            
            onChange={(e)=>{setLength(e.target.value)}}
             />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
               <input 
               type="checkbox"
               defaultChecked={numericAllowed}
               id="numericInput"
               onChange={()=>{
                setNumericAllowed((prev) => !prev)

               }}

                />
                <label htmlFor="">Numeric</label>
          </div>
           
           <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={specialCharAllowed}
              id="specialCharInput"
              onChange={()=>{
                setSpecialCharAllowed((prev)=>!prev)
              }} 
              />
              <label htmlFor="">Symbols</label>
           </div>

        </div>

      </div>

    </>
  )
}

export default App
