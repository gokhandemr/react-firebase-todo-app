import {initializeApp} from "firebase/app";
// Giriş ve Kimlik Doğrulama
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import {EmailAuthProvider} from "firebase/auth/web-extension";
// Veritabanı
import {getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, getDocs, orderBy} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//! --------------- Kullanıcı Giriş, Kayıt, Şifre Vb. İşlemleri --------------- !//

// Kayıt
export const firebaseRegisterSubmit = async (name, email, password) => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      try {
        await updateProfile(auth.currentUser, {displayName: name});
        return "ok";
      } catch (error) {
        return error.message;
      }
    }
  } catch (error) {
    return error.message;
  }
};

// Giriş
export const firebaseLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    return error.message;
  }
};

// Google ile giriş
export const firebaseGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    return "ok";
  } catch (error) {
    return error.message;
  }
};

// Çıkış
export const firebaseSingOut = async () => {
  try {
    await signOut(auth);
    return "Çıkış yapıldı";
  } catch (error) {
    return error.message;
  }
};

// Şifre sıfırlama
export const firebaseResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "ok";
  } catch (error) {
    return error.message;
  }
};

// Şifre değiştirme
export const firebaseUpdatePassword = async (oldEmail, password, newPassword) => {
  try {
    const credential = EmailAuthProvider.credential(oldEmail, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    return "ok";
  } catch (error) {
    return error;
  }
};

// E-mail Değiştirme
export const firebaseUpdateEmail = async (oldEmail, newEemail, password) => {
  try {
    const credential = EmailAuthProvider.credential(oldEmail, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, `${newEemail}`);
    return "ok";
  } catch (error) {
    return error;
  }
};

// E-mail Doğrulama
export const firebaseEmailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    return "ok";
  } catch (error) {
    return error;
  }
};

// Kullanıcı Adı Ve Fotografı Değiştirme
export const firebaseUptadeUserDetails = async (name, photo) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: `${name}`,
      photoURL: `${photo}`,
    });
    return "ok";
  } catch (error) {
    return error;
  }
};

// Kullanıcı Hesabı Silme
export const firebaseDeleteUser = async (mail, password) => {
  try {
    const credential = EmailAuthProvider.credential(mail, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await deleteUser(auth.currentUser);
    return "ok";
  } catch (error) {
    return error;
  }
};

//! --------------- Veritabanı İşlemleri --------------- !//

// Veri ekleme
export const firebaseAddTodo = async (userId, todo, isComplete, timeStamp) => {
  try {
    await addDoc(collection(db, `${userId}`), {
      todo: todo,
      isComplete: isComplete,
      timeStamp: timeStamp,
    });
    return "ok";
  } catch (error) {
    return error;
  }
};

// Veri güncelleme
export const firebaseUpdateTodo = async (userId, todoId, isComplete) => {
  try {
    const location = `/${userId.toString()}/${todoId.toString()}`;
    await updateDoc(doc(db, location), {
      isComplete: isComplete,
    });
    return "ok";
  } catch (error) {
    return error;
  }
};

// Veri çekme
export const firebaseGetTodos = async (userId) => {
  const querySnapshot = await getDocs(collection(db, `${userId}`), orderBy("timeStamp", "DESC"));
  return querySnapshot.docs;
};

// Veri silme
export const firabaseDeleteTodo = async (userId, todoId) => {
  try {
    const location = `/${userId.toString()}/${todoId.toString()}`;
    await deleteDoc(doc(db, location));
    return "ok";
  } catch (error) {
    return error;
  }
};
