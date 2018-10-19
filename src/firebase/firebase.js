import * as firebase from 'firebase';
// import expenses from '../tests/fixtures/expenses';


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('notes/-LP3lWf9B2CoQQ7l88as').remove();

// // setup expenses
// expenses.forEach((item, index) => {
//     delete item['id'];
//     database.ref('expenses').push(item);
// });

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         });
//         console.log(expenses);
//     });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });
//     console.log(expenses);
// });

// database.ref('notes').push({
//     title: "Course Topics",
//     body: 'React Native, Angular, Python'
// });

// database.ref().on('value', (snapshot) => {
//     const values = snapshot.val();
//     console.log(`${values.name} is a ${values.job.title} at ${values.job.company}.`);
// }, (error) => {
//     console.log('Error with data fetching', error)
// });

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((error) => {
//         console.log('Error fetching data', error);
//     })

// database.ref().set({
//     name: 'Tim Dietrich',
//     age: 30,
//     stressLevel: 6,
//     job: {
//         title: "Software Developer",
//         company: "Neustar"
//     },
//     location: {
//         city: 'Sunnyvale',
//         state: 'California',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved.');
// }).catch((error) => {
//     console.log(error)
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     "location/city": "Seattle"
// });

// database.ref().remove()
//     .then(() => {
//         console.log('Data was removed.');
//     })
//     .catch((error) => {
//         console.log(error)
//     });

// database.ref('isSingle').set(null);