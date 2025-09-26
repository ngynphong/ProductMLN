import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

// Type definitions
interface PageContent {
  type: 'paragraph';
  text: string;
}

interface PageData {
  type: 'cover' | 'page' | 'spread' | 'back-cover';
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  content?: PageContent[] | string[];
  quote?: string;
  author?: string;
  credits?: string;
  left?: {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    caption?: string;
    content?: PageContent[] | string[];
    isList?: boolean;
  };
  right?: {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    caption?: string;
    content?: PageContent[] | string[];
    isList?: boolean;
  };
}

// === Dữ liệu nội dung cho Tạp chí ===
const magazineContent = {
  pages: [
    // Trang Bìa
    {
      type: 'cover',
      title: 'CHỐNG THAM NHŨNG',
      subtitle: 'Xây dựng Nhà nước trong sạch, vững mạnh - Trách nhiệm của toàn dân',
      imageUrl: 'https://special.nhandan.vn/Chong-tham-nhung-tieu-cuc/assets/iS00rbsAQW/4ec68d45c0266e783737-2560x1440.jpg'
    },
    // Trang 1: Lời ngỏ
    {
      type: 'page',
      title: 'Lời ngỏ',
      content: [
        { type: 'paragraph', text: 'Phòng, chống tham nhũng là một nhiệm vụ trọng tâm, một cuộc đấu tranh gay go, phức tạp nhằm làm trong sạch bộ máy nhà nước, củng cố lòng tin của nhân dân và bảo vệ sự vững mạnh của chế độ.' },
        { type: 'paragraph', text: 'Đây không chỉ là trách nhiệm của Đảng, Nhà nước mà còn là quyền và nghĩa vụ của mỗi công dân.' },
        { type: 'paragraph', text: 'Ấn phẩm này sẽ hệ thống hóa các nội dung cốt lõi về tham nhũng, tác hại, và đặc biệt là vai trò, trách nhiệm của công dân theo tinh thần của pháp luật.' },
      ]
    },
    // Trang 2-3: Khái niệm & Các hành vi tham nhũng
    {
      type: 'spread',
      left: {
        imageUrl: 'https://quocphongthudo.vn/upload/2001606/fck/haiyennguyen.qptd/tieu-chi-danh-gia-tham-nhung.jpg',
        caption: 'Tham nhũng - mối đe dọa từ bên trong bộ máy nhà nước.'
      },
      right: {
        title: 'Khái niệm & Các hành vi tham nhũng',
        subtitle: 'Hiểu đúng và nhận diện kịp thời',
        content: [
          { type: 'paragraph', text: '📌 Theo luật định, tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi. Yếu tố cốt lõi là "lợi dụng quyền lực công để mưu cầu lợi ích riêng".' },
          { type: 'paragraph', text: '📌 Các hành vi phổ biến: Tham ô tài sản, nhận hối lộ, lạm dụng chức vụ, đưa hối lộ, nhũng nhiễu... Luật quy định 12 hành vi tham nhũng cụ thể cần được giám sát chặt chẽ.' }
        ]
      }
    },
    // Trang 4-5: Nguyên nhân của tham nhũng
    {
      type: 'spread',
      left: {
        title: 'Nguyên nhân của tham nhũng',
        subtitle: 'Từ khách quan đến chủ quan',
        content: [
          { type: 'paragraph', text: '📌 Khách quan: Tác động từ mặt trái kinh tế thị trường; hệ thống chính sách, pháp luật thiếu đồng bộ; công tác quản lý nhà nước còn lỏng lẻo.' },
          { type: 'paragraph', text: '📌 Chủ quan: Sự suy thoái về tư tưởng chính trị, đạo đức, lối sống của một bộ phận cán bộ, công chức; công tác quản lý, giáo dục cán bộ còn hạn chế.' }
        ]
      },
      right: {
        imageUrl: 'https://cdn.nbtv.vn/upload/news/8_2022/bv1_14123013082022.jpg',
        caption: 'Hệ thống pháp luật còn kẽ hở là một trong những nguyên nhân khách quan.'
      }
    },
    // Trang 6-7: Tác hại của tham nhũng
    {
      type: 'spread',
      left: {
        imageUrl: 'https://a.tcnn.vn/uploads/resources/truonghq/images/thamnhung12-5.jpg',
        caption: 'Tham nhũng làm xói mòn lòng tin và gây bất ổn xã hội.'
      },
      right: {
        title: 'Tác hại của tham nhũng',
        subtitle: 'Phá hoại từ bên trong',
        isList: true,
        content: [
          'Chính trị: Làm suy giảm lòng tin của nhân dân vào sự lãnh đạo của Đảng và Nhà nước.',
          'Kinh tế: Gây thiệt hại tài sản công, làm chậm sự phát triển.',
          'Xã hội: Gia tăng bất bình đẳng, xói mòn các giá trị đạo đức.'
        ]
      }
    },
    // Trang 8-9: Vai trò của Đảng và Nhà nước 
    {
      type: 'spread',
      left: {
        title: 'Vai trò của Đảng & Nhà nước',
        subtitle: 'Kiên quyết, không có vùng cấm',
        content: [
          { type: 'paragraph', text: '📌 Đảng và Nhà nước ta xác định phòng, chống tham nhũng là "cuộc chiến chống giặc nội xâm", với tinh thần "không có vùng cấm, không có ngoại lệ".' },
          { type: 'paragraph', text: '📌 Hàng loạt cơ chế, chính sách, pháp luật đã được ban hành và hoàn thiện, cùng với đó là sự chỉ đạo quyết liệt của Ban Chỉ đạo Trung ương về phòng, chống tham nhũng, tiêu cực, góp phần củng cố lòng tin của nhân dân.' }
        ]
      },
      right: {
        imageUrl: 'https://dukccq.danang.gov.vn/documents/14005/0/bannoichinh.jpg/646db9ef-fe79-4ee9-bec8-8471f1c2ce96?t=1715138809059',
        caption: 'Quyết tâm chính trị của Đảng và Nhà nước là yếu tố tiên quyết.'
      }
    },
    // Trang 8-9: Trách nhiệm của công dân
    {
      type: 'spread',
      left: {
        title: 'Trách nhiệm của công dân',
        subtitle: 'Quyền và nghĩa vụ trong cuộc chiến chống tham nhũng',
        isList: true,
        content: [
          'Chấp hành nghiêm chỉnh pháp luật về phòng, chống tham nhũng.',
          'Có quyền phát hiện, phản ánh, tố cáo hành vi tham nhũng.',
          'Có nghĩa vụ hợp tác với cơ quan có thẩm quyền.',
          'Tham gia giám sát thông qua các kênh chính thức.'
        ]
      },
      right: {
        imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2023/11/11/dad2-online-1699718147010715051336.jpg',
        caption: 'Sức mạnh của nhân dân là yếu tố quyết định thắng lợi.'
      }
    },
    // Trang 10-11: Giá trị thực tiễn của sản phẩm
    {
      type: 'spread',
      left: {
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        caption: 'Sản phẩm không chỉ là công cụ giáo dục mà còn góp phần xây dựng xã hội công bằng.'
      },
      right: {
        title: 'Giá trị thực tiễn của sản phẩm',
        subtitle: 'Chuyển hóa lý luận thành ứng dụng thực tiễn',
        isList: true,
        content: [
          'Giáo dục pháp luật: Công cụ truyền thông hiện đại, phổ biến kiến thức dễ tiếp cận, đổi mới phương pháp tuyên truyền sinh động.',
          'Thúc đẩy quyền và trách nhiệm công dân: Trao quyền phát hiện/tố cáo, nâng cao ý thức và trách nhiệm xã hội.',
          'Củng cố niềm tin xã hội: Làm rõ quyết tâm chính trị "không vùng cấm", tạo sức đề kháng xã hội chống tham nhũng.',
          // '📌 Kết luận: Chuyển hóa kiến thức lý thuyết thành công cụ ứng dụng, góp phần nâng cao nhận thức và trách nhiệm công dân.'
        ]
      }
    },
    // Trang cuối
    {
      type: 'back-cover',
      quote: '"Phải nhốt quyền lực vào trong lồng cơ chế, luật pháp."',
      author: 'Tổng Bí thư Nguyễn Phú Trọng',
      credits: ''
    }
  ]
};

// === Các Components ===

// Component Hero Section (Phần giới thiệu đầu trang)
const HeroSection = () => (
  <div className="min-h-screen w-full flex flex-col justify-center items-center text-center text-white relative px-4 py-16 md:py-0" style={{ background: 'linear-gradient(135deg, #8B0000 0%, #B22222 50%, #FFD700 100%)' }}>
    <div className="absolute inset-0 bg-black opacity-30"></div>
    {/* <img src="https://file3.qdnd.vn/data/images/0/2021/12/26/tuanson/bo-sung-phat-trien-hoan-thien-chu-nghia-mac-lenin.jpg?dpi=150&quality=100&w=870" alt="Công lý" className="absolute inset-0 w-full h-full object-cover opacity-20" /> */}
    <div className="relative z-10 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 tracking-tight text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>Triết học Mác - Lênin qua lăng kính hiện đại</h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white px-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        Khám phá nội dung "Phòng, chống tham nhũng và trách nhiệm của công dân" thông qua một ấn phẩm số trực quan.
      </p>
    </div>
    <div className="flex flex-col items-center absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5" />
      </svg>
      <span className="mt-2 block text-sm sm:text-base">Cuộn xuống</span>
    </div>
  </div>
);


// Component Magazine (Toàn bộ quyển tạp chí)
const Magazine = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);
  const totalPages = magazineContent.pages.length;

  // Handle page flip
  const handleFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        flipBookRef.current?.pageFlip().flipPrev();
      } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        flipBookRef.current?.pageFlip().flipNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  // Render page content
  const renderPageContent = (pageData: PageData) => {
    switch (pageData.type) {
      case 'cover':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center text-center text-white p-4 sm:p-6 md:p-8 relative"
            style={{ background: 'linear-gradient(135deg, #8B0000 0%, #FFD700 100%)', backgroundImage: `url(${pageData.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex flex-col items-center px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-widest text-white mb-4" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.9)' }}>{pageData.title}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-md text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>{pageData.subtitle}</p>
            </div>
          </div>
        );
      case 'page':
        return (
          <div className="w-full h-full p-4 sm:p-6 md:p-8 bg-[#F5F5DC] flex flex-col">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 border-b-4 border-[#8B0000] pb-2 text-center">{pageData.title}</h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed flex-1 overflow-y-auto">
              {pageData?.content?.map((item: PageContent | string, i: number) => (
                <p key={i} className="text-justify" dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.text }} />
              ))}
            </div>
          </div>
        );
      case 'spread':
        return (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 bg-[#F5F5DC]">
            {/* Left Side */}
            <div className="flex flex-col justify-center space-y-4">
              {pageData?.left?.imageUrl ? (
                <div className="flex flex-col items-center space-y-3">
                  <img src={pageData.left.imageUrl} alt={pageData.left.caption || 'Image'} className="rounded-lg shadow-xl w-full h-auto object-cover max-h-80 sm:max-h-96 border-4 border-[#8B0000]" />
                  {pageData.left.caption && <p className="text-sm sm:text-base md:text-lg text-gray-700 italic text-center font-medium px-2">{pageData.left.caption}</p>}
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center">{pageData?.left?.title}</h3>
                  <p className="text-base sm:text-lg md:text-xl text-[#8B0000] font-semibold text-center mb-3">{pageData?.left?.subtitle}</p>
                  <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                    {pageData?.left?.isList ? (
                      <ul className="list-disc list-inside space-y-2 text-justify">
                        {pageData.left.content?.map((item: PageContent | string, i: number) => (
                          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.text }} />
                        ))}
                      </ul>
                    ) : (
                      pageData?.left?.content?.map((item: PageContent | string, i: number) => <p key={i} className="text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.text }} />)
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Right Side */}
            <div className="flex flex-col justify-center space-y-4">
              {pageData?.right?.imageUrl ? (
                <div className="flex flex-col items-center space-y-3">
                  <img src={pageData.right.imageUrl} alt={pageData.right.caption || 'Image'} className="rounded-lg shadow-xl w-full h-auto object-cover max-h-80 sm:max-h-96 border-4 border-[#8B0000]" />
                  {pageData.right.caption && <p className="text-sm sm:text-base md:text-lg text-gray-700 italic text-center font-medium px-2">{pageData.right.caption}</p>}
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center">{pageData?.right?.title}</h3>
                  <p className="text-base sm:text-lg md:text-xl text-[#8B0000] font-semibold text-center mb-3">{pageData?.right?.subtitle}</p>
                  <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                    {pageData?.right?.isList ? (
                      <ul className="list-disc list-inside space-y-2 text-justify">
                        {pageData.right.content?.map((item: PageContent | string, i: number) => (
                          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.text }} />
                        ))}
                      </ul>
                    ) : (
                      pageData?.right?.content?.map((item: PageContent | string, i: number) => <p key={i} className="text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.text }} />)
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'back-cover':
        return (
          <div className="w-full h-full flex flex-col justify-center items-center text-center text-white p-4 sm:p-6 md:p-8 relative" style={{ background: 'linear-gradient(135deg, #8B0000 0%, #FFD700 100%)' }}>
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic font-serif max-w-2xl text-white px-4 mb-4 leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>"{pageData.quote}"</blockquote>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>- {pageData.author} -</p>
            <p className="text-sm sm:text-base md:text-lg text-white opacity-80">{pageData.credits}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] aspect-[4/5] relative">
        <HTMLFlipBook
          ref={flipBookRef}
          width={450}
          height={500}
          size="stretch"
          minWidth={400}
          maxWidth={800}
          minHeight={500}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="magazine-flipbook"
          style={{
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {magazineContent.pages.map((pageData, index) => (
            <div key={index} className="magazine-page">
              {renderPageContent(pageData, index)}
            </div>
          ))}
        </HTMLFlipBook>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-2 text-white text-xs">
          <div>← → Mũi tên</div>
          <div>Click để lật</div>
        </div>
      </div>
    </div>
  );
};


// Component Magazine Section (Khu vực chứa tạp chí)
const MagazineSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#F5F5DC] py-16 md:py-24 px-4 flex flex-col items-center justify-start">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Ấn phẩm số</h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto">
          Lật qua từng trang để khám phá cuộc chiến chống tham nhũng và vai trò, trách nhiệm của mỗi công dân.
        </p>
        <Magazine />
      </div>
    </div>
  )
}

// === App Chính ===
export default function App() {
  return (
    <main className="bg-[#F5F5DC]">
      <HeroSection />
      <MagazineSection />
    </main>
  );
}
