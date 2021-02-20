import getFirebaseAdmin from 'firebaseConfigs/admin';

const destroyAccount = async (id: string) => {
  try {
    const admin = await getFirebaseAdmin();
    if (!admin) return null;
    const User = await admin.auth();
    await User.deleteUser(id);
  } catch (error) {
    throw error;
  }
};

export default destroyAccount;
