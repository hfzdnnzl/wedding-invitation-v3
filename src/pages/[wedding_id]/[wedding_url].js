import Head from 'next/head';
import { useEffect } from 'react';
import { db as adminDb } from '@/firebaseAdmin'; // Ensure correct path
import { getImageUrl } from '@/firebase';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import CardCover from '@/components/CardCover';
import styles from '@styles/CardCover.module.css'

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

    const imagePath = `themes/${wedding_data.maklumat_majlis.theme}/`
    const imageUrl = {
      topFlower: await getImageUrl(imagePath + 'top-right-flower.png'),
      bottomFlower: await getImageUrl(imagePath + 'bottom-left-flower.png'),
    }

    return {
      props: {
        wedding_data,
        wedding_id,
        wedding_url,
        imageUrl
      },
    };
  } catch (error) {
    console.error('Error fetching wedding data:', error);
    return {
      notFound: true,
    };
  }
}
  
export default function WeddingPage({ wedding_data, wedding_id, wedding_url, imageUrl }) {
  useEffect(() => {
    Aos.init({
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false,
      mirror: true,
    });
  }, []);
  
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
  <>
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

    <main className={styles["app-content"]}>
      <CardCover wedding_data={wedding_data} imageUrl={imageUrl}/>
    </main>
  </>

  );
}
