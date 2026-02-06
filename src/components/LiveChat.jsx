import React, { useEffect, useState } from 'react'
import accountIcon from '../assets/account.png'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import randomNameGen from '../utils/randomNameGen'
import randomMessageGen from '../utils/randomMessageGen'

const MessageBox = ({name, message}) => {
    return (
        <div className='px-4 py-1 mb-2 flex items-center hover:bg-gray-100 cursor-pointer'>
            <img src={accountIcon} alt="User Avatar" className="w-6 h-6 rounded-full inline-block align-top mr-2" />
            <div className='inline-block w-full '>
                <h1 className='inline text-sm font-semibold text-gray-900  pr-4'>{name}</h1>
                <p className='inline text-sm text-gray-800 leading-4'>{message}</p>
            </div>
        </div>
    )
}

const ChatSection = () => {

    const dispatch = useDispatch();
    const chatMessage = useSelector((store) => store.chat.messages)

    useEffect(()=>{
        const t = setInterval(() => {
            dispatch(addMessage({
                name : randomNameGen(),
                message : `${randomMessageGen(15)} 🚀🚀`
            }))
        }, 1500);

        return () =>  clearInterval(t);
    }, []);

    return (
        <div className="  w-full overflow-y-auto  flex-1 flex flex-col-reverse">

            {
                chatMessage.map((item, idx) => {
                    return <MessageBox key={idx} name={item.name} message={item.message}/>
                })
            }
            
        </div>
    )
}

const LiveChat = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    dispatch(addMessage({
      name: "Akshay Saini",
      message: inputValue
    }));
    
    setInputValue('');
  }

  return (
    <div className='h-120 border border-gray-300 rounded-lg  bg-white flex flex-col '>
        <div>
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 p-3">
                Live Chat
            </h2>
        </div>

        <ChatSection />
        
        <form 
            className="p-3 flex gap-4 border-t  border-gray-300"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                placeholder="Type your message..." 
                className="px-3 py-1 border border-gray-300 rounded-4xl focus:outline-none flex-1 bg-gray-100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className='bg-black text-white px-4 rounded-4xl'>
                send
            </button>
        </form>
    </div>
  )
}

export default LiveChat