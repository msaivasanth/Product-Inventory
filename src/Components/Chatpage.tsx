import React, { LegacyRef, RefObject, useContext, useEffect, useRef, useState } from 'react'
import productContext from '../ProductsContext/productContext';
import { Link } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import InputEmojiWithRef from 'react-input-emoji';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
var compare = ""
var chatImg = "";

interface Message {
    id: string,
    sender: string,
    content: string,
    chat: string
}

interface contextInterface {
    fetchChats: () => Promise<void>,
    getUsers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    getMessages: (id: string, chatName: string) => Promise<void>,
    handleSendMessage: (message: string) => Promise<void>,
    createChat: (id: string, sender: string, senderName: string) => Promise<void>,
    joinRoom: (user: string, room: string, receiverId: string) => Promise<void>,
    closeConnection: () => Promise<void>,
    chats: [],
    val: string,
    setVal: (val: string) => void,
    messages: Message[],
    ref: RefObject<HTMLButtonElement> | null,
    users: [],
    userId: string,
    selectedChat: string,
    message: string,
    setMessage: (message: string) => void,
    chatId: string,
    connection: HubConnection | undefined,
    notifications: Message[]
    setNotifications: (notifcations: Message[]) => void
    setMessages: (messages: Message[]) => void
    setConnection: (connection: HubConnection | undefined) => void
}
const Chatpage = () => {

    var { fetchChats, getUsers, handleSendMessage, createChat, joinRoom, chats, val, setVal, messages, ref, users, userId, selectedChat, message, setMessage, chatId, connection, notifications, setNotifications, setMessages, setConnection }: contextInterface = useContext(productContext);


    const mesgRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)

    const [file, setFile] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const connection = new HubConnectionBuilder().withUrl("http://localhost:5103/chatRoom")
            .build();

        connection.onclose((e) => {
            setConnection(undefined)
        })

        connection.start().then((res) => {
            connection.invoke("JoinRoom", { user: "sender", room: userId }).then().catch(error => console.log(error));
        }).catch(error => console.log(error));

        setConnection(connection)

    }, [])

    useEffect(() => {
        connection?.on("NewReceiveMessage", (newMessage: any) => {
            if (compare === "" || compare !== newMessage.message.chat) {
                if (!notifications.includes(newMessage)) {
                    setNotifications([newMessage, ...notifications]);
                }
            }
            else {
                setMessages([...messages, newMessage.message])
            }
        })
    })

    useEffect(() => {
        fetchChats();

    }, [selectedChat])

    useEffect(() => {
        if (mesgRef.current) {
            mesgRef.current.scrollTop = mesgRef.current?.scrollHeight
        }
    }, [messages])

    const handleNotifications = async (noti: any) => {
        await joinRoom(noti.user, noti.message.chat, noti.message.sender);
        compare = noti.message.chat
        var notis = notifications.filter((not) => { return noti != not });
        setNotifications(notis)
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        let image = ''
        if (files) {
            setLoading(true)

            let file = files[0];

            console.log(file.type)
            const data = new FormData()
            data.append('file', file!)
            data.append('upload_preset', 'Product-Inventory')
            data.append('cloud_name', "detuevaxw")

            const response = await fetch('https://api.cloudinary.com/v1_1/detuevaxw/upload', {
                method: 'post',
                body: data,
            })
            const json = await response.json()
            image = json.url.toString()
        }
        else {
            alert('please upload png or jpeg files or image not found.')
        }
        setLoading(false)
        setFile(image)
    }

    const isUrl = (message: string) => {
        let regex: RegExp = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;
        return regex.test(message);
    }

    const isImage = (url: string) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    const isVideo = (url: string) => {
        return url.match(/\.(mp4|webm|ogg)$/) != null;
    };
    return (
        <div>
            <div className="d-flex justify-content-between mx-5">
                <Link to={'/home'} className='btn btn-dark m-2 text-center'>Go Back</Link>
                <p className="fs-1 text-center mb-2 d-flex justify-content-center">Welcome to chat page</p>
                <div className="dropdown">
                    <button type="button" className="btn btn-primary position-relative m-3 me-5" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='fa-solid fa-bell'></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {notifications.length}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </button>
                    <ul className="dropdown-menu">
                        {notifications.map((noti: any) => {
                            return <li><button className="dropdown-item" type="button" onClick={async () => await handleNotifications(noti)}>{`New Message from "${noti.user}"`}</button></li>
                        })}
                    </ul>
                </div>

            </div>

            <div className='container-fluid'>
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
                                        <div className='w-auto shadow p-2 mb-2 bg-body-tertiary rounded border border-black' style={{ "cursor": "pointer" }} onClick={() => { createChat(userId, user.id, user.name); compare = user.id }}>
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
                                    <div className='w-auto shadow p-2 mb-2 bg-body-tertiary rounded border border-black' style={{ "cursor": "pointer" }} onClick={async () => { await joinRoom(chat[1], chat[0], chat[2]); compare = chat[0]; }}>
                                        <div className="w-100 fs-5 d-flex" >{chat[1]}</div>
                                    </div>
                                }</>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-8 shadow p-3 mb-2 bg-body-tertiary rounded border border-black">
                        {selectedChat !== "" ? <div className={`${selectedChat === "" && "d-none"}`}>
                            <div className={`fs-1 bg-secondary-subtle px-3 py-1 rounded `}>
                                {selectedChat}
                            </div>

                            <div className='overflow-y-auto' style={{ "height": "490px" }} ref={mesgRef}>
                                {messages.map((message: any) =>
                                    <div className={`d-flex ${message.sender === userId ? "flex-row-reverse" : ""} fs-5 my-1 p-1`}>
                                        <div className={`${message.sender === userId ? "bg-info-subtle" : "bg-success-subtle"} min-50 px-2 py-1 rounded `}>
                                            {isUrl(message.content) ?
                                                <p>{isImage(message.content) ? <img src={message.content} className="object-fit-fill border rounded" alt="image" style={{"width": "350px", "height": "350px"}}/> : 
                                                <div>
                                                    {isVideo(message.content) ? 
                                                    <video src={message.content} className="object-fit-fill" style={{"width": "350px", "height": "250px"}} controls></video>: <a className="link-opacity-100-hover" href={message.content} target='_blank' >{message.content}</a>
                                                    }
                                                </div>
                                                }</p>
                                                :
                                                <div>{message.content}</div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='d-flex'>
                                <InputEmojiWithRef
                                    value={message}
                                    onChange={setMessage}
                                    shouldReturn={true}
                                    shouldConvertEmojiToImage={false}
                                    onEnter={(e) => { handleSendMessage(message); }}
                                    placeholder="Type a message"
                                    fontSize={20}
                                    borderColor='black'
                                    borderRadius={10}
                                    keepOpened={true}
                                    cleanOnEnter
                                />

                                <button ref={buttonRef} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden>
                                    Launch demo modal
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-2" id="exampleModalLabel">Select a file to send</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">{
                                                loading === true ? "loading...." :
                                                    <input className="form-control form-control-lg" type="file" id="formFileMultiple" onChange={(e) => handleChange(e)}/>}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-success btn-lg" onClick={() => handleSendMessage(file!)} data-bs-dismiss="modal">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn border-black rounded p-3" onClick={() => buttonRef.current?.click()}>
                                    <i className="fa-solid fa-upload" ></i>
                                </div>

                            </div>
                        </div> : <div className='fs-1 d-flex justify-content-center'>Select a chat or search users to start messaging</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatpage
