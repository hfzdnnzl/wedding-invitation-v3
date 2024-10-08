import styles from '@styles/CardCover.module.css'

const CardCover = ({ wedding_data, imageUrl }) => {

    return (
        <div className={`${styles['cover-box']} h-[80vh]`} data-aos="zoom-in-down">
            <div data-aos="zoom-in" ><p>Walimatul Urus</p></div>
            <div data-aos="zoom-in" ><h1 className={`${styles['font-pattaya']} text-[calc(28px+2vmin)]`}>
                {wedding_data.maklumat_majlis.tajuk}</h1></div>
            <div data-aos="zoom-in" ><p>{wedding_data.maklumat_majlis.tarikh}</p></div>


            <div className={styles['gold-border']}><div className={styles['gold-border-inner']}/></div>

            <img src={imageUrl.bottomFlower} alt="Flower Bottom Left" 
            className={`${styles['flower-deco']} bottom-0 left-0`} data-aos="fade-right"/>

            <img src={imageUrl.topFlower} alt="Flower Top Right" 
            className={`${styles['flower-deco']} top-0 right-0`} data-aos="fade-left" />
        </div>
    );
};

export default CardCover;