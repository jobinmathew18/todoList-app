import React, { useEffect, useState } from 'react'

const storage = ()=>{
    if(localStorage.getItem('todo') === null){
        return []
    }else{
        return JSON.parse(localStorage.getItem('todo'))
    }
}
export const Todo = () => {
    const [todo, settodo] = useState(storage())
    const [test, setTest] = useState("")
    const [toggleBtn, settoggleBtn] = useState(true)
    const [listId, setlistId] = useState(null)

    const handleOnchange = (e) => {
        setTest(e.target.value)
    }

    const handleAdd = () => {
        if(!test){
            alert('please fill data')
        }
        else if(test && !toggleBtn){
            settodo(
                todo.map((ele) => {
                    if (ele.id === listId) {
                        return { ...ele, name:test}
                    }
                    return ele
                })
            )
            console.log(todo)
            settoggleBtn(true)
            setTest("")
            setlistId(null)
        }
        else{
            const allInputData = { id: new Date().getTime().toString(), name: test }
            settodo([...todo, allInputData])
            // console.log(todo)
            setTest("")
        }
    }

    const handleEdit = (id) => {
        let newEditItem = todo.find((ele) => ele.id === id)
        // console.log(newEditItem)
        settoggleBtn(false)
        setTest(newEditItem.name)
        setlistId(id)
    }

    const handleDelete = (id) => {
        // console.log(id)
        const updateElement = todo.filter((ele) => ele.id !== id)
        settodo(updateElement)
    }

    useEffect(() => {
        //The values that are stored in the localStorage should be of the string datatype. To store an object or an array in the localStorage , we first
        //need to convert it to string using the JSON. stringify() method.
        localStorage.setItem("todo", JSON.stringify(todo))
    }, [todo])       //whenever value of [todo] changes, useEffect will run.  


    return (
        <div className='main-div'>
            <div className="child-div">
                <figure>
                    <figcaption>Add your list here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='add items...' onChange={handleOnchange} value={test} />
                    {toggleBtn ? <i className='fa fa-plus add-btn' title='add item' onClick={handleAdd}></i>
                        : <i className='far fa-edit add-btn' title='Update item' onClick={handleAdd}></i>}
                </div>


                <div className="showItems">
                    {todo.length > 0 &&
                        todo.map((ele) => {
                            // { console.log(ele) }
                            return <div className="eachItem" key={ele.id}>
                                <h1>{ele.name}</h1>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" title='Edit item' onClick={() => handleEdit(ele.id)}></i>
                                    <i className="far fa-trash-alt add-btn" title='Delete item' onClick={() => handleDelete(ele.id)}></i>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="showItems">
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={() => settodo([])}><span>Check list</span></button>
                </div>
            </div>
        </div>
    )
}
