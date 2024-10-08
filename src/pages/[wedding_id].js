import { useRouter } from 'next/router';
import { db as adminDb } from '@/firebaseAdmin'; // Ensure this path is correct

export async function getServerSideProps(context) {
  const { wedding_id } = context.params;

  try {
    // Fetch the wedding document using the wedding_id
    const weddingDoc = await adminDb.collection('weddings').doc(wedding_id).get();

    if (!weddingDoc.exists) {
      return {
        notFound: true, // Return 404 if the wedding doesn't exist
      };
    }

    const wedding_data = weddingDoc.data();
    const wedding_url = wedding_data.maklumat_majlis.url; // Get the wedding_url

    // Redirect to /wedding_id/wedding_url
    return {
      redirect: {
        destination: `/${wedding_id}/${wedding_url}`,
        permanent: false, // Set to true if you want it to be a permanent redirect
      },
    };
  } catch (error) {
    console.error('Error fetching wedding data:', error);
    return {
      notFound: true, // Handle error
    };
  }
}

const WeddingRedirectPage = () => {
  // This component will not be rendered because of the redirect
  return null;
};

export default WeddingRedirectPage;
