import React, { LegacyRef, RefObject, useContext, useEffect, useRef, useState } from 'react'
import productContext from '../ProductsContext/productContext';
import { Link } from 'react-router-dom';

interface contextInterface {
    fetchChats: () => Promise<void>,
    getUsers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    getMessages: (id: string, chatName: string) => Promise<void>,
    handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    createChat: (id: string, sender: string, senderName: string) => Promise<void>,
    joinRoom: (user: string, room: string, name: string) => Promise<void>,
    closeConnection: () => Promise<void>,
    chats: [],
    val: string,
    setVal: (val: string) => void,
    messages: [],
    ref:  RefObject<HTMLButtonElement> | null,
    users: [],
    userId: string,
    selectedChat: string,
    message: string,
    setMessage: (message: string) => void
}
const Chatpage = () => {

    const {fetchChats, getUsers, handleSendMessage, createChat, joinRoom, chats, val,setVal,messages,ref,users,userId,selectedChat,message,setMessage}: contextInterface = useContext(productContext);

    useEffect(() => {
        fetchChats();
    }, [chats])
            


    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-around">
            <Link to={'/home'} className='btn btn-dark m-2 ms-0 d-flex justify-content-center'>Go Back</Link>
            <p className="fs-1 text-center mb-2 d-flex justify-content-center">Welcome to chat page</p>
            </div>
            
            <div className="row" style={{ height: "660px", width: "100%" }}>
                <div className="col-3 me-4 ms-5 shadow p-3 mb-2 bg-body-tertiary rounded border border-black">
                    <div className='searchUsers'>
                        <form className="d-flex" role="search" onSubmit={(e) => getUsers(e)} >
                            <input className="form-control me-2 fs-5" type="search" placeholder="Search Users" aria-label="Search" value={val} onChange={(e) => setVal(e.target.value)} />
                            <button className="btn btn-success fs-5" type="submit" >Search</button>
                        </form>
                    </div>
                    <button ref={ref} className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Enable both scrolling & backdrop</button>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fs-4" id="offcanvasWithBothOptionsLabel">Search Result</h5>
                            <button type="button" className="btn-close d-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                        <div className='mt-2'>
                            {users.length == 0 ? <div className='fs-5'>No Results found</div> : users.map((user: any) => <>{
                                <div className='w-auto shadow p-2 mb-2 bg-body-tertiary rounded border border-black' style={{ "cursor": "pointer" }} onClick={() => createChat(userId, user.id, user.name)}>
                                    <div className="w-100 fs-5" >{user.name}</div>
                                </div>
                            }</>)}
                        </div>
                        </div>
                    </div>
                    <div className='chatBox fs-4'>
                        My Chats
                        <div className='mt-2'>
                            {chats.map((chat) => <>{
                                <div className='w-auto shadow p-2 mb-2 bg-body-tertiary rounded border border-black' style={{ "cursor": "pointer" }} onClick={async () => {await joinRoom(chat[1], chat[0], chat[2]); }}>
                                    <div className="w-100 fs-5" >{chat[1]}</div>
                                </div>
                            }</>)}
                        </div>
                    </div>
                </div>
                <div className="col-8 shadow p-3 mb-2 bg-body-tertiary rounded border border-black">
                    {selectedChat !== "" ?<div className={`${selectedChat === "" && "d-none"}`}>
                        <div className={`fs-1 bg-secondary-subtle px-3 py-1 rounded `}>
                            {selectedChat}
                        </div>

                        <div className='overflow-y-auto' style={{ "height": "490px" }}>
                            {messages.map((message: any) =>
                                <div className={`d-flex ${message.sender ===userId ? "flex-row-reverse" : ""} fs-5 my-1 p-1`}>
                                    <div className={`${message.sender === userId ? "bg-info-subtle" : "bg-success-subtle"} min-50 px-2 py-1 rounded`}>{message.content}</div>
                                </div>
                            )}
                        </div>

                        <div className=''>
                            <form onSubmit={(e) => handleSendMessage(e)} className='position-static bottom-0 end-0 w-100 mt-1'>
                                <input type="text" value={message} className="form-control p-3 rounded border border-black" onChange={(e) => setMessage(e.target.value)} />
                            </form>
                        </div>

                    </div>: <div className='fs-1 d-flex justify-content-center'>Select a chat or search users to start messaging</div>}
                </div>
            </div>
        </div>
    )
}

export default Chatpage
