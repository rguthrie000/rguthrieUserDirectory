import axios from "axios";

async function loadUsers() {
  const recordsToFetch = 5000;
  const BASEURL = `https://randomuser.me/api/?results=${recordsToFetch}&nat=us`;
  let res = await axios.get(BASEURL);
  return(res);
}

export default loadUsers;