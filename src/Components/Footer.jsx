import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

    const linkedin = 'https://www.linkedin.com/in/sumit-singh-developer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app';
    const insta = 'https://www.instagram.com/rustygenius_98/';

    const handleInstaClick = () => {
        window.open(insta, '_blank');
    }

    const handleLinkedinClick = () => {
        window.open(linkedin, '_blank');
    }

    return (
        <div className='h-[50px] md:h-[70px] bg-black flex justify-between w-full fixed z-10 bottom-0'>
            <div className='text-white text-2xl md:text-4xl font-semibold font-lemon tracking-wider pl-4 h-full w-fit flex items-center'>
                Rusty #98
            </div>
            <div className='h-full flex justify-center items-center mr-4'>
                <LinkedInIcon onClick={handleLinkedinClick} fontSize='large' className='text-white mr-2 cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300' />
                <InstagramIcon onClick={handleInstaClick} fontSize='large' className='text-white cursor-pointer hover:scale-[1.2] transition-all ease-in-out duration-300' />
            </div>
        </div>
    )
}

export default Footer;