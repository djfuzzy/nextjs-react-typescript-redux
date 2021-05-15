import firebase from 'firebase/app';

export const getServerTimestamp = (): firebase.firestore.FieldValue => {
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
  return serverTimestamp;
};

export const convertTimestampToDate = (
  timestamp: firebase.firestore.Timestamp
): Date => {
  return new firebase.firestore.Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  ).toDate();
};

export const convertTimestampsToDates = (
  firebaseObject: firebase.firestore.DocumentData | undefined
): firebase.firestore.DocumentData | undefined => {
  if (!firebaseObject) return firebaseObject;

  for (const [key, value] of Object.entries(firebaseObject)) {
    // covert items inside array
    if (value && Array.isArray(value))
      firebaseObject[key] = value.map((item) => convertTimestampsToDates(item));

    // convert inner objects
    if (value && typeof value === 'object') {
      firebaseObject[key] = convertTimestampsToDates(value);
    }

    // convert simple properties
    if (value && Object.prototype.hasOwnProperty.call(value, 'seconds'))
      firebaseObject[key] = convertTimestampToDate(value);
    //        value as firebase.firestore.Timestamp
    //    ).toDate();
  }
  return firebaseObject;
};
