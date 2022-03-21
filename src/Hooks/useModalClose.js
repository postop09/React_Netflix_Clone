import React, { useEffect, useRef } from 'react'

export default function useModalClose(modalOpen, setModalOpen, secOut ) {
  
  const handleClickOutside = ({ target }) => {
    if (modalOpen && !secOut.current.contains(target)) setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return modalOpen;
}

// const [menuBtnClick, setMenuBtnClick] = useState(false);
// const outSection = useRef();

// return (
//   <div>
//     <header>
//     ...
//     <button type="button" onClick={()=>{setMenuBtnClick(true)}}>
//     메뉴버튼
//     </button>
//     ...
//     {
//       menuBtnClick === true
//         ? (<div class="modal-outside" ref={outSection} onClick={(e)=>{
//           if(outSection.current === e.target) {
//               setMenuBtnClick(false)
//           }
//       }}>
//         <div class="modal-content"> 모달창 내용</div>
//       <div>)
//       : null
//     }
//     </header>
//   </div>
// )
// return modalOpened;