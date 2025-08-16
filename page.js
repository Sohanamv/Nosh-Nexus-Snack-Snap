'use client'
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import { collection, addDoc,getDoc,querySnapshot,query,onSnapshot,deleteDoc,doc} from "firebase/firestore";
import {db} from './firebase'

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [items, setItems]=useState([
  ]);
  // eslint-disable-next-line no-unused-vars
  const [newItem,setNewItem]=useState({name:'',price:''});
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal]=useState(0)
// Add item to database
// eslint-disable-next-line no-unused-vars
const addItem = async(e) => {
  e.preventDefault()
  if(newItem.name !== '' && newItem!=='' ){
// eslint-disable-next-line no-undef
await addDoc(collection(db,'items'),{
  name: newItem.name.trim(),
  price: newItem.price,
});
      setNewItem({name:'',price:''});
  }
};
//read
useEffect(()=>{
const q=query(collection(db,'items'))
// eslint-disable-next-line no-unused-vars
const unsubscribe=onSnapshot(q,(querySnapshot)=>{
  let itemsArr=[]

  querySnapshot.forEach((doc)=>{
    itemsArr.push({...doc.data(),id: doc.id})
  })
  setItems(itemsArr);
  //read total items
  // eslint-disable-next-line no-unused-vars
  const calculateTotal=()=>{const totalPrice =itemsArr.reduce((sum,item)=>sum+ parseFloat(item.price),0);
  // eslint-disable-next-line no-undef
  setTotal(totalPrice);
}
calculateTotal()
return()=>unsubscribe();

});
},[])

//delete
const deleteItem=async(id)=>{
  await deleteDoc(doc(db,'items',id));
};

    return (
    <main className = "flex min-h-screen flex-col items-center justify-between sm:p-24 p-4" >
        <div className = "z-10 max-w-5xl w-full items-center justify-between font-mono text-sm " >
         <h1 className = 'text-4xl p-4 text-center'>Snacksnap <br />CostCompass</h1>
         <div className="bg-stale-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black" >
            <input
            value={newItem.name}
            onChange={(e) =>setNewItem({...newItem,name:e.target.value})}
            className="col-span-3 p-3 border"
            type="text"
            placeholder='Enter item'
             />
            <input
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            className="col-span-2 p-3 border mx-3"
            type="number"
            placeholder='Enter $'
            />
            <button
            onClick={addItem}
            className=" text-white bg-blue-950 hover:bg-blue-900 p-3 text-xl"
            type="submit">
                                  +
              </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between'>
                <div className='p-4 w-full flex justify-between'>
              <span className='capitalize'>{item.name}</span>
              <span>${item.price}</span>
            </div>
<button onClick={()=>deleteItem(item.id)} className='ml-8 p-4 border-l-2 border-green-900 hover:bg-blue-900 w-16' >
  X
  </button>
            </li>
          ))}
          </ul>
          {items.length<1 ? (''): (
            <div className='flex justify-between p-3 '>
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
         </div>
        </div>
        </main>
    )
}