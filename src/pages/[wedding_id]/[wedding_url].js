import Head from 'next/head';
import { db as adminDb } from '@/firebaseAdmin'; // Ensure correct path

export async function getStaticPaths() {
  // Fetch all wedding IDs to generate paths
  try {
    const weddingsSnapshot = await adminDb.collection('weddings').get();
    const paths = weddingsSnapshot.docs.map(doc => {
      return {
        params: { 
          wedding_id: doc.id ,
          wedding_url: doc.data().maklumat_majlis.url, // Include wedding_url
        },
      };
    });

    console.log('Generated paths:', paths);

    return {
      paths,
      fallback: true, // Enable fallback if needed
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { paths: [], fallback: false};
  }
}

export async function getStaticProps(context) {
  const { wedding_id, wedding_url } = context.params;

  try {
    // Fetch the wedding document by ID
    const weddingDoc = await adminDb.collection('weddings').doc(wedding_id).get();

    if (!weddingDoc.exists) {
      return {
        notFound: true,
      };
    }

    const wedding_data = weddingDoc.data();

    // Optional: Validate wedding_url matches (for SEO-friendly URLs)
    if (wedding_url !== wedding_data.maklumat_majlis.url) {
      return {
        redirect: {
          destination: `/${wedding_id}/${wedding_data.maklumat_majlis.url}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        wedding_data,
        wedding_id,
        wedding_url
      },
    };
  } catch (error) {
    console.error('Error fetching wedding data:', error);
    return {
      notFound: true,
    };
  }
}
  
export default function WeddingPage({ wedding_data, wedding_id, wedding_url }) {
  if (!wedding_data) {
    return <div>Loading...</div>;
  }

  const {
    maklumat_majlis,
    ibu_bapa,
    atur_cara,
    kalendar,
    contacts,
    lokasi,
    cenderahati
  } = wedding_data;

  
  const meta_title = `Walimatul Urus | ${maklumat_majlis.tajuk} | ${maklumat_majlis.tarikh}`
  const meta_description = "Tekan link untuk lihat jemputan"

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{`Walimatul Urus | ${maklumat_majlis.tajuk}`}</title>
        <meta name="title" content={meta_title}/>
        <meta name="description" content={meta_description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kad-undangan.my/${wedding_id}/${wedding_url}`} />
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:image" content="/images/meta-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://kad-undangan.my/${wedding_id}/${wedding_url}`} />
        <meta property="twitter:title" content={meta_title} />
        <meta property="twitter:description" content={meta_description} />
        <meta property="twitter:image" content="/images/meta-image.jpg" />
      </Head>

      <main className="max-w-4xl mx-auto p-6">
        <h1>{maklumat_majlis.tajuk}</h1>
        <p className="text-gray-800">
          <strong>Date:</strong> {maklumat_majlis.tarikh}
        </p>
        <p className="text-gray-800">
          <strong>Time:</strong> {maklumat_majlis.waktu}
        </p>
        <p className="text-gray-800">
          <strong>Location:</strong> {maklumat_majlis.alamat}
        </p>
        {/* Additional wedding details */}
      </main>

      <footer className="text-center p-4 bg-white shadow-inner">
        © {new Date().getFullYear()} kad-undangan.my
      </footer>
    </div>
  );
}
