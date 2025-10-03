import Ruanu from '../assets/hkRuanu.png';

export const NotFound = () => {
  return (
    <div className='  flex justify-center items-center min-h-screen bg-jetBlack '>
      <div className='flex flex-col items-center w-1/2 '>
        <div className='w-96'>
          <img src={Ruanu} alt='' className='w-full' />
        </div>

        <div className='w-full text-lightGray'>
          <h2 className='font-semibold text-4xl font-serif text-center '>
            This Page is not Real
          </h2>
          <p className='mt-10'>
            The imposing figure with the trenchcoat shows you the two polaroids.
            One appears to show the Loch Ness monster herself in the middle of a
            stretch of dark water. The other shows a sasquatch picking it’s way
            through a dark forest. You look closer. The animal shapes are drawn
            on with ink. “This isn’t real!” You scream and throw the polaroids
            to the floor, sobbing.
          </p>
        </div>
      </div>
    </div>
  );
};
