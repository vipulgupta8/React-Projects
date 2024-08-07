import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../../features/flashCardSlice';
import { useParams } from 'react-router-dom';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiOutlineCopy, AiOutlineDownload, AiOutlinePrinter } from 'react-icons/ai';
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { AiFillLinkedin, AiOutlineTwitter, AiOutlineCheck, AiOutlineShareAlt } from 'react-icons/ai';
import { CgMail } from 'react-icons/cg';
import { TfiShare } from 'react-icons/tfi';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import { Document, Page,Image, Text, View, pdf } from "@react-pdf/renderer";



export const TermGroup = () => {
    const { flashcardIndex } = useParams();
    const navigate = useNavigate();
    const flashcardId = parseInt(flashcardIndex);
    const flashcards = useSelector((state) => selectAll(state));
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
  
    const totalPictures = flashcards[flashcardId]?.termGroup.length;
  
    const handleGoBack = () => {
      navigate(-1)
    }
  
    const handlePrevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + totalPictures - 1) % totalPictures);


    };
  
    const handleNextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPictures );

    };
  
    const handleTermClick = (index) => {
      setCurrentSlide(index);     
    };

    const handleShare = () => {
      setShowShareModal(true);
    };
  
    const handleCloseShareModal = () => {
      setShowShareModal(false);
    };
  
    const handleCopy = () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

  
  const handleDownload = async () => {
    const pdfContent = (
      <Document >
        <Page size="A4" style={{
          padding: 30
        }}>
          <View style={{
            flexDirection:'column',
            marginBottom: 20,
          }}>
          <View style={{
              flexDirection:'column',
              alignItems:'center'
             }}>
              <Text style={{
                 fontSize: 24,
                 fontWeight: 'bold',
                 marginBottom: 10,
                 color:'indianred'
              }}>
               
              FLASH CARD
              </Text>
             <Text style={{
                 fontSize: 24, // Main Group Name in big size
                 fontWeight: 'bold', // Bold
                 marginBottom: 10, // Add spacing below
                 color:'dodgerblue'
              }}>
               
              {flashcards[flashcardId]?.mainGroup?.mainGroupName}
              </Text>
              <Text style={{
                  fontSize: 18, 
                  marginBottom: 20,
                  color:'dodgerblue'
             }}>
              {flashcards[flashcardId]?.mainGroup?.mainGroupDescription}
              </Text>
          </View>
          <View style={{
              flexDirection: 'column', 
              alignItems: 'left', 
              
          }}>
          {flashcards[flashcardId]?.termGroup.map((term, index) => (
            <View key={index} style={{
              marginBottom: 20,
            }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold', 
                  marginBottom: 10,
                  color:'cyan',
                  
              }}>{term?.termGroupName}</Text>
              <View style={{
                  flexDirection: 'row', 
                  }}>
              <Image 
              src={term?.termGroupImage?.termImageURL}

              style={{
                width: '180px',
                height: 'auto',
                marginRight: 10
              }}
              />
              <Text style={{
                   flex: 1, 
                   fontSize: 14,
              }}>
                {term?.termGroupDescription}</Text>
                </View>

            </View>

          ))}
          </View>
          </View>
        </Page>
      </Document>
    );
    const blob = await pdf(pdfContent).toBlob();
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "flashcard.pdf";
    link.click();
  
    URL.revokeObjectURL(blobUrl);
  }
  
    const handlePrint = async () => {
      const printPdfContent =  (
        <Document >
          <Page size="A4" style={{
            padding: 30
          }}>
            <View style={{
              flexDirection:'column',
              marginBottom: 20,
            }}>
            <View style={{
                flexDirection:'column',
                alignItems:'center'
               }}>
               <Text style={{
                   fontSize: 24, // Main Group Name in big size
                   fontWeight: 'bold', // Bold
                   marginBottom: 10, // Add spacing below
                }}>
                {flashcards[flashcardId]?.mainGroup?.mainGroupName}
                </Text>
                <Text style={{
                    fontSize: 18, 
                    marginBottom: 20
               }}>
                {flashcards[flashcardId]?.mainGroup?.mainGroupDescription}
                </Text>
            </View>
            <View style={{
                flexDirection: 'column', 
                alignItems: 'left', 
            }}>
            {flashcards[flashcardId]?.termGroup.map((term, index) => (
              <View key={index} style={{
                marginBottom: 20,
              }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold', 
                    marginBottom: 10,
                }}>{term?.termGroupName}</Text>
                <View style={{
                    flexDirection: 'row', 
                    }}>
                <Image 
                src={term?.termGroupImage?.termImageURL}
  
                style={{
                  width: '180px',
                  height: 'auto',
                  marginRight: 10
                }}
                />
                <Text style={{
                     flex: 1, 
                     fontSize: 14,
                }}>
                  {term?.termGroupDescription}</Text>
                  </View>
  
              </View>
  
            ))}
            </View>
            </View>
          </Page>
        </Document>
      )

      const blob = await pdf(printPdfContent).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl)

    if (printWindow) {
      printWindow.print();
    }
      
    };    

     
  return (
    <div   className='p-5'>
      <div>
        <div className='flex flex-row'>
          <div className='mr-3'>
          
            <button className='text-[20px] mt-2'  onClick={handleGoBack} >
            <AiOutlineArrowLeft />
            </button>
          </div>
        
          <div className='mb-3'>
            <h1 className='text-[20px] font-bold mb-3'>
            {flashcards[flashcardId]?.mainGroup?.mainGroupName}
            </h1>
            <p className='text-[20px] break-all '>
            {flashcards[flashcardId]?.mainGroup?.mainGroupDescription}
            </p>
          </div>
        </div>

        
        <div className='flex flex-col lg:flex-row  space-y-3 lg:space-x-3 lg:space-y-0'>
           
          <div  className='bg-white w-full  p-2 h-auto  lg:w-40  lg:h-60 '>
            <div className=' lg:block border-b-2 flex items-center justify-center p-2'>
              <h1 className='text-[21px]  '>Flashcards</h1>
            </div>
            <div
            id='term-names-container'
            className=' 
           flex flex-row  lg:flex-col  items-center justify-center'
           >

            {flashcards[flashcardId]?.termGroup.map((term, index) => (
              <motion.div  key={index}
              className={`flex items-center ml-2  cursor-pointer  ${
                currentSlide === index ? 'text-red-500 ' : 'hidden sm:block'
              }`}
              onClick={() => handleTermClick(index)}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, delay: index * 0.1 } 
              }}
              >
                <h2
                   className={`text-lg  mt-2 ${
            currentSlide === index ? 'font-bold active-term' : ''
          }`}
          
                >
                  {term.termGroupName}
                </h2>
              </motion.div>
            ))}
            
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full'>
          
          <div className='bg-white flex flex-col  lg:flex-row w-full overflow-hidden min-h-80 p-3 items-center justify-center'>
            <motion.img
              src={flashcards[flashcardId]?.termGroup[currentSlide]?.termGroupImage?.termImage}
              className='  lg:w-1/2 w-[320px] h-[320px] lg:h-64 object-fit overflow-hidden '
              alt='term img'
              initial={{ opacity: 0, x: 100  }}
              animate={{ opacity: 1 , x: 0 }}
              exit={{opacity: 0 , x: -100}}
              transition={{duration: 1}}
            />
            <p className='relative bottom-5 top-3 ml-0 lg:ml-4 text-[20px] w-full lg:w-1/2 h-auto break-all'>
            {flashcards[flashcardId]?.termGroup[currentSlide]?.termGroupDescription}
            </p>
          </div>
             
        <div className='flex flex-row justify-center mt-3 mb-3 space-x-3' >
          <button className='text-[20px]'onClick={handlePrevSlide} >
          <FaLessThan />
          </button>

          
          <p className='text-[23px]'>
          {currentSlide + 1} / {flashcards[flashcardId]?.termGroup?.length || 0}
          </p>
          <button className='text-[20px]' onClick={handleNextSlide} >
          <FaGreaterThan />
          </button>
        </div>
      </div>
      
          
          
      <div className='flex flex-row lg:flex-col items-center justify-center lg:justify-normal sm:justify-center md:justify-center space-x-1  lg:space-y-3 lg:space-x-0'>
           
            <button className='w-20 md:w-32 lg:w-36 p-2 text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleShare} >
            <TfiShare />
              <span >Share</span>
            </button>
             
            <button className='w-20 md:w-32 lg:w-36 p-2 text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleDownload} >
            <AiOutlineDownload />
            <span >Download</span>
            </button>
           
            <button className='w-20 md:w-32 lg:w-36 p-2 text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handlePrint} >
            <AiOutlinePrinter />
            <span>Print</span>
            </button>
          </div>
        </div>
        </div> 
        

      {showShareModal && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white w-100 h-68 p-2'>
            
            <button  className='text-[19px] hover:text-red-500 float-right' onClick={handleCloseShareModal} >
            <IoMdClose />
            </button>
            <h2 className='text-[17px] font-bold mt-4 ml-6'>Share</h2>
            <div className='flex flex-row'>
              <input type='text' className='w-full p-3 text-[15px] ml-2 mt-6 mb-6 border border-grey-300' value={window.location.href} readOnly />
              
              <button onClick={handleCopy} className='text-[20px]'>
              {isCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
              </button>
              <button className='text-[20px]'>
              <AiOutlineShareAlt />
              </button>
            </div>
            
            <div className='flex flex-row space-x-5 justify-center mt-4'>
            <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
                <BsFacebook className='text-[30px] text-blue-500' />
              </a>
              <a href='https://www.whatsapp.com' target='_blank' rel='noreferrer'>
                <BsWhatsapp className='text-[30px] text-green-500' />
              </a>
              <a href='https://www.linkedin.com' target='_blank' rel='noreferrer'>
                <AiFillLinkedin className='text-[30px] text-blue-600' />
              </a>
              <a href='https://www.gmail.com' target='_blank' rel='noreferrer'>
                <CgMail className='text-[30px] text-red-500 ' />
              </a>
              <a href='https://www.twitter.com' target='_blank' rel='noreferrer'>
                <AiOutlineTwitter className='text-[30px] text-blue-300' />
              </a>

            </div>
            <div className='mt-3'></div>
          </div>
        </div>
        )}

        
    </div>
  );
};


