import { useState } from 'react'

const files = [
  { class: 'file', icon: 'fas fa-file', title: 'Documents', number: 23, size: '127MB' },
  { class: 'image', icon: 'fas fa-image', title: 'Photos', number: 5, size: '127MB' },
  { class: 'music', icon: 'fas fa-music', title: 'Audio', number: 23, size: '127MB' },
  { class: 'film', icon: 'fas fa-film', title: 'Movies', number: 23, size: '127MB' },
  { class: 'archive', icon: 'fas fa-archive', title: 'Archives', number: 23, size: '127MB' },
  { class: 'copy', icon: 'fas fa-copy', title: 'Other', number: 23, size: '127MB' },
  { class: 'link', icon: 'fas fa-link', title: 'Links', number: 23, size: '' },
]

function ChatMeta() {
  const [toogled, setToogled] = useState(false)
  const toogle = () => setToogled(!toogled)
  const number = 5
  return (
    <nav className={'right' + (toogled ? ' collapsed' : '')}>
      <header className='can-toogle'>
        <button className='btn toogler' onClick={toogle}>
          <i className='fas fa-chevron-right'></i>
        </button>
        <span className='title'>Shared files</span>
      </header>
      <div className='info'>
        <img src='https://picsum.photos/300' alt='group-avatar'></img>
        <div className='info-title'>Group Name</div>
        <div className='info-description'>{number} Members</div>
      </div>

      <div className='items'>
        {files.map((e, k) => {
          if (e.number > 0)
            return (
              <div key={k} className={`item ${e.class}`}>
                <div className='icon'>
                  <i className={e.icon}></i>
                </div>
                <div className='item-data'>
                  <span className='item-title'>{e.title}</span>
                  <span className='item-description'>
                    {e.number} file{e.number > 1 ? 's' : ''} {e.size ? ',' : ''} {e.size}
                  </span>
                </div>
              </div>
            )
          return <></>
        })}
      </div>
    </nav>
  )
}

export default ChatMeta

// import { genRandomDate, formatDate, genRandomString } from '../../helpers'

// function Navigation() {
//   return (
//     <nav >

//       <div className='profile-preview'>
//         <button className='settings'>
//           <i className='fas fa-cog'></i>
//         </button>
//         <div className='image-profile active'>
//           <img src='https://picsum.photos/300' alt='avatar'></img>
//         </div>
//         <span className='title'>Ahmed Meftah</span>
//         <div className='select active'>
//           <button>Connected</button>
//           <div>
//             <button>Connected</button>
//             <button>Busy</button>
//             <button>Disconected</button>
//           </div>
//         </div>
//         {/*
//           <div className='active inactive busy'>
//         */}
//         <input type='text' placeholder='search' className='search'></input>

//         <div className='chat-actions-bar'>
//           <span className='sub-title'>Last chats</span>
//           <div className='chat-actions'>
//             <button className='btn is-primary-light'>
//               <i className='fas fa-plus'></i>
//             </button>
//             <button className='btn is-transparent'>
//               <i className='fas fa-ellipsis-v'></i>
//             </button>
//           </div>
//         </div>
//         <div className='list-chat'>
//           {Array.from({ length: 20 })
//             .map((_, k) => ({
//               avatar: 'https://picsum.photos/50',
//               date: genRandomDate(),
//               name: `User ${k + 1}`,
//               preview: genRandomString(),
//             }))
//             .sort((a, b) => b.date - a.date)
//             .map((item, key) => (
//               <div key={key} className={`list-chat-item${key === 0 ? ' active' : ''}`}>
//                 <div className='avatar'>
//                   <img src={item.avatar} alt='avatar'></img>
//                 </div>
//                 <div>
//                   <span className='name'>{item.name}</span>
//                   <span className='preview'>{item.preview}</span>
//                 </div>
//                 <span className='date'>{formatDate(item.date)}</span>
//               </div>
//             ))}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navigation
