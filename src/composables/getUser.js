import { ref } from "vue";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// refs
const user = ref(auth.currentUser);

// auth changes
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

function getUser() {
  return { user };
}

export default getUser;
