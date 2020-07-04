// const socket = io();

// let newUser = [];
// let pending;
// let setTime = 0;
// socket.on("newUserSignUp", (message) => {
//   newUser.unshift(message);
//   if (newUser.length > 0 && newUser.length <= 1) {
//     pendingList();
//   }

//   if (newUser.length < 1) {
//     setTime = 0;
//   } else {
//     setTime = 3000;
//   }
// });


// function pendingList() {
//   pending = setInterval(() => {
//     if (newUser.length > 0) {
//       $("#container").append(`  <div class="notification">
//       <p> ${newUser[newUser.length - 1]}</p>
//     </div>
//     `);

//       setTimeout(() => {
//         $(".notification").css("top", "15%");
//       }, 100);
//       setTimeout(() => {
//         $(".notification").css("right", "-50%");
//       }, 1000);
//       setTimeout(() => {
//         $(`.notification`).remove();
//       }, 1900);
//       newUser.pop();
//     } else {
//       clearInterval(pending);
//     }
//   }, setTime);
// }


// let newUpdate = 0;
// let pendingUpdate;
// let time = 1000
// socket.on("Update", (message) => {
//   if (message[0] === "comment") {
//     $(`${message[1]}`).append(message[2]);
//     $(`${message[1]}`).animate(
//       { scrollTop: $(`${message[1]}`).height() * 100000 },
//       1000
//     );
//   }

//   if (message[0] === "deletepost") {
//     let post = document.querySelectorAll(`${message[1]}`);
//     post.forEach((item) => {
//       if (item.dataset.postid === message[2]) {
//         generateRecentPost();
//       }
//     });
//   }

//   if (message[0] === "unfriend") {
//     if (document.cookie.split("=")[1] === message[1]) {
//       newUpdate++
//       if(newUpdate > 0 && newUpdate <= 1)
//       {
//         updatePendingList()
//       }   
//     }
//   }

//   if (message[0] === "addfriend") {
//     if (document.cookie.split("=")[1] === message[1]) {
//       newUpdate++
//       if(newUpdate > 0 && newUpdate <= 1)
//       {
//         updatePendingList()
//       }   
//     }
//   }

//   if (message[0] === "newpost") {
//     let list = document.querySelectorAll(".friendbox");
//     list.forEach((item) => {
//       if (item.dataset.friendbtn === message[1]) {
//         generateRecentPost();
//       }
//     });
//   }
// });


// socket.on("Update", (message) => {
//   if (message[0] === "comment") {
//     $(`${message[1]}`).append(message[2]);
//     $(`${message[1]}`).animate(
//       { scrollTop: $(`${message[1]}`).height() * 100000 },
//       1000
//     );
//   }

//   if (message[0] === "deletepost") {
//     let post = document.querySelectorAll(`${message[1]}`);
//     post.forEach((item) => {
//       if (item.dataset.postid === message[2]) {
//         generateRecentPost();
//       }
//     });
//   }

//   if (message[0] === "unfriend") {
//     if (document.cookie.split("=")[1] === message[1]) {
//       renderFriendSuggestion();
//       generateRecentPost();
//     }
//   }

// function updatePendingList()
// {

//   pendingUpdate = setInterval(() => {
//     if(newUpdate > 0)
//     {
//       renderFriendSuggestion();
//       renderMyFriends();
//       generateRecentPost();
//       newUpdate--
//     }
//     else
//     {
//       clearInterval(pendingUpdate)
//     }
    
//   }, time);
// }