"use client";

import { useState, useRef, Fragment, useEffect, useMemo } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useHoverSound } from "@/hooks/useHoverSound";const MISSIONS = [
  {
    title: 'ELFAKHARANY PASTRY SYSTEM',
    date: '2024',
    status: 'COMPLETED',
    link: 'http://elfakharanypastry.com/',
    desc: 'Elfakharany Pastry: A sophisticated food delivery web app featuring a smart menu, high-conversion landing page, and a professional management dashboard.',
    images: [
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-52-25.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-52-29.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-52-45.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-52-50.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-53-02.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-53-05.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-53-10.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/Screenshot from 2026-06-12 07-53-12.png',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/WhatsApp Image 2026-06-12 at 8.04.06 AM.jpeg',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/WhatsApp Image 2026-06-12 at 8.04.06 AM (1).jpeg',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/WhatsApp Image 2026-06-12 at 8.04.06 AM (2).jpeg',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/WhatsApp Image 2026-06-12 at 8.04.06 AM (3).jpeg',
      'Elfakharany Pastry - laning page - smart menu - Food deleviry web app - profisinal dashboard/WhatsApp Image 2026-06-12 at 8.04.06 AM (4).jpeg'
    ]
  },
  {
    title: 'START AGENCY (MAIN)',
    date: '2024',
    status: 'COMPLETED',
    link: 'https://www.startagency.net/',
    desc: 'The core digital footprint for Start Agency. A high-end introductory landing page tailored for a digital marketing agency.',
    images: [
      'النسخه الاساسيه من موقع ستارت لاندينج بيج تعريفي لشركة تسويق الكتروني/Screenshot from 2026-06-12 07-50-46.png',
      'النسخه الاساسيه من موقع ستارت لاندينج بيج تعريفي لشركة تسويق الكتروني/Screenshot from 2026-06-12 07-50-48.png',
      'النسخه الاساسيه من موقع ستارت لاندينج بيج تعريفي لشركة تسويق الكتروني/Screenshot from 2026-06-12 07-50-50.png',
      'النسخه الاساسيه من موقع ستارت لاندينج بيج تعريفي لشركة تسويق الكتروني/Screenshot from 2026-06-12 07-50-54.png',
      'النسخه الاساسيه من موقع ستارت لاندينج بيج تعريفي لشركة تسويق الكتروني/Screenshot from 2026-06-12 07-50-56.png'
    ]
  },
  {
    title: 'WAEL EL GENDY PORTAL',
    date: '2024',
    status: 'CLASSIFIED',
    link: 'https://waelelgendy.com/',
    desc: 'Official platform for Parliament Member Wael El Gendy. Features news updates and a highly secure, private management dashboard safeguarding citizen data.',
    images: [
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-15.png',
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-18.png',
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-21.png',
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-23.png',
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-29.png',
      'النائب وائل الجندي - موقع خاص بالنائب فيه اخباره ومعلومات عنه وداش بورد احترافيه لكن مش هيتم عرضها حفظاً علي امان بيانات المواطنين/Screenshot from 2026-06-12 07-53-33.png'
    ]
  },
  {
    title: 'REYAZA E-COMMERCE & ERP',
    date: '2024',
    status: 'COMPLETED',
    link: 'https://reyaza.startagency.net/',
    desc: 'Comprehensive E-commerce platform for Reyaza Plant Fertilizers. Integrates an advanced dashboard serving as a full ERP for order, inventory, and representative management.',
    images: [
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-51-19.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-51-22.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-51-25.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-51-39.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-00.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-02.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-06.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-13.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-19.png',
      'شركة رياذا لأسمدة النباتات - موقع تجارة الكترونيه - داش بورد احترافيه جداً لإدارة الطلبات والمخزون والمنادي (يعني نقدر نقول erp)/Screenshot from 2026-06-12 07-52-21.png'
    ]
  },
  {
    title: 'EDUCATIONAL PLATFORM MVP',
    date: '2024',
    status: 'COMPLETED',
    link: 'https://platform-v110.vercel.app',
    desc: 'A highly secure, dual-interface educational MVP. Features advanced content delivery, subscription management, and session tracking for both students and instructors.',
    images: [
      'MVP منصة تعليميه للطالب والمعلم ادارة محتوي ادارة اشتراكات ادارة جلسات الطلبه علي مستوي عالي من الحمايه/Screenshot from 2026-06-12 07-50-59.png',
      'MVP منصة تعليميه للطالب والمعلم ادارة محتوي ادارة اشتراكات ادارة جلسات الطلبه علي مستوي عالي من الحمايه/Screenshot from 2026-06-12 07-51-04.png',
      'MVP منصة تعليميه للطالب والمعلم ادارة محتوي ادارة اشتراكات ادارة جلسات الطلبه علي مستوي عالي من الحمايه/Screenshot from 2026-06-12 07-51-08.png',
      'MVP منصة تعليميه للطالب والمعلم ادارة محتوي ادارة اشتراكات ادارة جلسات الطلبه علي مستوي عالي من الحمايه/Screenshot from 2026-06-12 07-51-11.png',
      'MVP منصة تعليميه للطالب والمعلم ادارة محتوي ادارة اشتراكات ادارة جلسات الطلبه علي مستوي عالي من الحمايه/Screenshot from 2026-06-12 07-51-16.png'
    ]
  },
  {
    title: 'START AGENCY (EXPERIMENTAL)',
    date: '2024',
    status: 'EXPERIMENTAL',
    link: 'https://start-agency-v1-1at1.vercel.app/',
    desc: 'An experimental, heavily animated landing page concept developed for Start Agency.',
    images: [
      'انيميتد لاندينج بيج لشركة ستارت/Screenshot from 2026-06-12 07-50-26.png',
      'انيميتد لاندينج بيج لشركة ستارت/Screenshot from 2026-06-12 07-50-29.png',
      'انيميتد لاندينج بيج لشركة ستارت/Screenshot from 2026-06-12 07-50-33.png',
      'انيميتد لاندينج بيج لشركة ستارت/Screenshot from 2026-06-12 07-50-37.png'
    ]
  },
  {
    title: 'REMONTADAT STORE',
    date: '2024',
    status: 'COMPLETED',
    link: '#',
    desc: 'Remontadat Store: A modern e-commerce platform designed for high-volume digital retail and seamless checkout experience.',
    images: [
      'موقع ريمونتادات ستور للتجارة الالكترونيه/Screenshot from 2026-06-12 07-49-19.png',
      'موقع ريمونتادات ستور للتجارة الالكترونيه/Screenshot from 2026-06-12 07-49-37.png',
      'موقع ريمونتادات ستور للتجارة الالكترونيه/Screenshot from 2026-06-12 07-49-43.png',
      'موقع ريمونتادات ستور للتجارة الالكترونيه/Screenshot from 2026-06-12 07-49-46.png',
      'موقع ريمونتادات ستور للتجارة الالكترونيه/Screenshot from 2026-06-12 07-50-18.png'
    ]
  }
];

const PROJECT_SCREENSHOTS = MISSIONS.map(m => m.images[0]);
const MOCK_FILES = [
  { name: 'sys_override_protocol.sh', size: '4.2 KB' },
  { name: 'intercepted_comms_09.pcap', size: '14.5 MB' },
  { name: 'lcpd_database_dump.sql', size: 'ENCRYPTED' },
  { name: 'surveillance_footage_cam04.mp4', size: '210.4 MB' },
  { name: 'backdoor_payload_v2.bin', size: '1.8 MB' },
  { name: 'target_gps_coordinates.dat', size: '89 KB' },
  { name: 'confidential_informants/', size: 'DIR' },
  { name: 'zero_day_exploit.exe', size: 'ENCRYPTED' },
];

const SOCIAL_LINKS = [
  { name: 'GITHUB // MOBX2', url: 'https://github.com/mobx2' },
  { name: 'LINKEDIN // IBRAHEEM SHAHEEN', url: 'https://www.linkedin.com/in/ibraheemshaheen/' },
  { name: 'EMAIL // ENCRYPTED COMMS', url: 'mailto:ibraheemshaheeh54@gmail.com' },
  { name: 'PHONE // DIRECT LINE', url: 'tel:+201515705914' },
];

type VisibleItem = 
  | { type: 'MISSION', mission: any, index: number }
  | { type: 'FILE', file: any, missionIndex: number, fileIndex: number };

export default function MissionList() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginStep, setLoginStep] = useState<'LOGIN' | 'AUTHENTICATING' | 'GRANTED' | 'DENIED'>('LOGIN');
  const [password, setPassword] = useState('');
  const [hintVisible, setHintVisible] = useState(false);

  const [currentView, setCurrentView] = useState<'ROOT' | 'FILES' | 'TERMINAL' | 'HELP'>('ROOT');
  const [rootActiveIndex, setRootActiveIndex] = useState(0);
  const [helpActiveIndex, setHelpActiveIndex] = useState(0);

  const [terminalHistory, setTerminalHistory] = useState<string[]>(['LCPD OS v9.2', 'Type "help" for a list of commands.']);
  const [terminalInput, setTerminalInput] = useState('');

  const [expandedMissionIndex, setExpandedMissionIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Index in visibleItems array
  const [selectedFile, setSelectedFile] = useState<{ missionIndex: number, fileIndex: number } | null>(null);
  const [fullScreenState, setFullScreenState] = useState<{ missionIndex: number, imageIndex: number } | null>(null);
  
  const { playHoverSound } = useHoverSound();
  const introRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Focus login input only when terminal is in view to prevent page load scroll jumps
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isAuthenticated) {
        setTimeout(() => {
          loginInputRef.current?.focus();
        }, 800);
      }
    }, { threshold: 0.6 });

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }
    return () => observer.disconnect();
  }, [isAuthenticated]);

  // Compute the flat list of visible items based on what is expanded
  const visibleItems = useMemo(() => {
    const items: VisibleItem[] = [];
    MISSIONS.forEach((m, i) => {
      items.push({ type: 'MISSION', mission: m, index: i });
      if (expandedMissionIndex === i) {
        items.push({ type: 'FILE', file: { name: '00_project_evidence_img.exe (View Image)', size: 'EXE' }, missionIndex: i, fileIndex: -1 });
        MOCK_FILES.forEach((f, fi) => {
          items.push({ type: 'FILE', file: f, missionIndex: i, fileIndex: fi });
        });
      }
    });
    return items;
  }, [expandedMissionIndex]);

  // Adjust active index if it goes out of bounds when collapsing a folder
  useEffect(() => {
    if (activeIndex >= visibleItems.length) {
      setActiveIndex(Math.max(0, visibleItems.length - 1));
    }
  }, [visibleItems.length, activeIndex]);

  useEffect(() => {
    if (currentView === 'TERMINAL') {
      setTimeout(() => terminalInputRef.current?.focus(), 100);
    }
  }, [currentView]);

  const dispatchKey = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, code: `Virtual${key}`, bubbles: true }));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Numpad keys from navigating or scrolling the page
      if (e.code.startsWith('Numpad')) {
        if (e.key.startsWith('Arrow') || ['Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
          e.preventDefault();
        }
        return;
      }

      // Don't interfere if they are in other menus unless it's our login input or terminal input
      if (document.activeElement?.tagName === 'INPUT' && 
          !document.activeElement.classList.contains('lcpd-login') &&
          !document.activeElement.classList.contains('lcpd-terminal-input')) return;
      
      if (!isAuthenticated) return;

      // Fullscreen Image controls
      if (fullScreenState) {
        if (e.key === 'Backspace' || e.key === 'Escape') {
          e.preventDefault();
          playHoverSound();
          setFullScreenState(null);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          playHoverSound();
          setFullScreenState(prev => {
            if (!prev) return null;
            const images = MISSIONS[prev.missionIndex].images;
            const nextIndex = (prev.imageIndex + 1) % images.length;
            return { ...prev, imageIndex: nextIndex };
          });
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          playHoverSound();
          setFullScreenState(prev => {
            if (!prev) return null;
            const images = MISSIONS[prev.missionIndex].images;
            const nextIndex = (prev.imageIndex - 1 + images.length) % images.length;
            return { ...prev, imageIndex: nextIndex };
          });
        }
        return;
      }

      if (currentView === 'ROOT') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setRootActiveIndex(prev => Math.max(0, prev - 1));
          playHoverSound();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setRootActiveIndex(prev => Math.min(2, prev + 1));
          playHoverSound();
        } else if (e.key === 'Enter') {
          playHoverSound();
          if (rootActiveIndex === 0) setCurrentView('FILES');
          else if (rootActiveIndex === 1) setCurrentView('TERMINAL');
          else if (rootActiveIndex === 2) setCurrentView('HELP');
        }
        return;
      }

      if (currentView === 'HELP') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHelpActiveIndex(prev => Math.max(0, prev - 1));
          playHoverSound();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHelpActiveIndex(prev => Math.min(SOCIAL_LINKS.length - 1, prev + 1));
          playHoverSound();
        } else if (e.key === 'Enter') {
          playHoverSound();
          window.open(SOCIAL_LINKS[helpActiveIndex].url, '_blank');
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
          playHoverSound();
          setCurrentView('ROOT');
        }
        return;
      }

      if (currentView === 'TERMINAL') {
        // Exit is handled by the input's onKeyDown (Backspace when empty)
        return;
      }

      if (currentView === 'FILES') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => Math.max(0, prev - 1));
          playHoverSound();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => Math.min(visibleItems.length - 1, prev + 1));
          playHoverSound();
        } else if (e.key === 'Enter') {
          const item = visibleItems[activeIndex];
          if (item) {
            if (item.type === 'MISSION') {
              setExpandedMissionIndex(expandedMissionIndex === item.index ? null : item.index);
            } else {
              if (item.fileIndex === -1) {
                setFullScreenState({ missionIndex: item.missionIndex, imageIndex: 0 });
              } else {
                setSelectedFile({ missionIndex: item.missionIndex, fileIndex: item.fileIndex });
              }
            }
            playHoverSound();
          }
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
          if (expandedMissionIndex !== null) {
            setExpandedMissionIndex(null);
            playHoverSound();
          } else {
            setCurrentView('ROOT');
            playHoverSound();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, currentView, rootActiveIndex, helpActiveIndex, activeIndex, visibleItems, expandedMissionIndex, fullScreenState, playHoverSound]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // INTRO ANIMATIONS
      gsap.to('.collage-grid', {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
        }
      });

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          pin: true,
          start: "top top",
          end: "+=800", // Reduced from 1500 so you don't scroll forever
          scrub: 1.5,
        }
      });

      headerTl.fromTo(".archive-title-word",
        { scale: 3, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, ease: "power4.out", duration: 2 }
      );

      headerTl.to(".header-tape-left", { x: "-50vw", ease: "none", duration: 5.5 }, 0);
      headerTl.to(".header-tape-right", { x: "50vw", ease: "none", duration: 5.5 }, 0);

      gsap.to(".massive-sticky-ticker", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        }
      });

      // TERMINAL ANIMATIONS
      const terminal = terminalRef.current;
      if (terminal) {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: "top top",
          end: "+=1500", // Total pinned duration
          scrub: 1,
        }
      });

      // Start slightly scaled down but mostly visible so it doesn't take forever to appear
      gsap.set(terminal, { scale: 0.85, opacity: 0, filter: "blur(5px)" });

      tl.to(terminal, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 0.5 // Appears quickly in the first 25% of the scroll
      })
      .to({}, { duration: 1.5 }); // Stays pinned and full-screen for the remaining scroll distance
      
      }
      
    });

  }, { scope: containerRef });

  const activeMission = MISSIONS[activeIndex];

  return (
    <div ref={containerRef} className="w-full relative z-[9999] bg-[#050505]">
      
      {/* MASSIVE STICKY TICKER THAT STAYS WITH YOU */}
      <div className="sticky top-[45vh] left-0 w-[300vw] h-0 z-0 pointer-events-none opacity-[0.03] overflow-visible">
        <h1 className="massive-sticky-ticker gta-title text-[15vw] leading-none text-white whitespace-nowrap will-change-transform">
          LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE // LCPD DATABASE //
        </h1>
      </div>

      {/* Intro Header Section (Mission Passed) */}
      <section ref={introRef} className="archive-header relative w-full h-screen bg-gta-black flex flex-col justify-center items-center overflow-hidden perspective-1000 z-20">
        <div className="collage-grid absolute -inset-[50vh] z-0 overflow-hidden grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 p-2 pointer-events-none opacity-25 will-change-transform">
          <div className="absolute inset-0 bg-gta-sepia/40 mix-blend-color z-10 pointer-events-none" />
          {[...Array(6)].map((_, loopIdx) => (
            <Fragment key={`loop-${loopIdx}`}>
              {PROJECT_SCREENSHOTS.map((src, i) => (
                <div key={`img-${loopIdx}-${i}`} className="relative aspect-video w-full rounded overflow-hidden border border-gta-sepia/20">
                  <img src={encodeURI(`/${src}`)} alt="Project" className="object-cover w-full h-full" />
                </div>
              ))}
            </Fragment>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[1] animate-crt-scroll" />
        <div className="absolute inset-0 gta-noise z-[2] pointer-events-none" />
        <div className="absolute inset-0 gta-vignette z-[3] pointer-events-none" />
        
        <div className="absolute top-[10%] -left-10 rotate-[-3deg] w-[200vw] h-14 bg-[#e6b800] z-10 flex items-center overflow-hidden pointer-events-none border-y-4 border-black drop-shadow-xl">
          <div className="header-tape-left flex gap-4 whitespace-nowrap font-sans font-black tracking-[0.2em] text-3xl text-black w-full" style={{ WebkitTextStroke: '0px', textShadow: 'none' }}>
            {[...Array(30)].map((_, idx) => (
              <span key={idx}>POLICE LINE DO NOT CROSS // LCPD // </span>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-[10%] -left-[100vw] rotate-[3deg] w-[200vw] h-14 bg-[#e6b800] z-10 flex items-center overflow-hidden pointer-events-none border-y-4 border-black drop-shadow-xl">
          <div className="header-tape-right flex gap-4 whitespace-nowrap font-sans font-black tracking-[0.2em] text-3xl text-black w-full" style={{ WebkitTextStroke: '0px', textShadow: 'none' }}>
            {[...Array(30)].map((_, idx) => (
              <span key={idx}>LCPD // POLICE LINE DO NOT CROSS // </span>
            ))}
          </div>
        </div>

        <div className="relative z-20 text-center px-4 flex flex-col items-center w-full">
          <div className="flex flex-col gap-8 items-center w-full">
            <div className="archive-title-word origin-center will-change-transform">
              <img 
                src="/5d0g3g.png" 
                alt="Mission Passed Respect +" 
                className="w-[80vw] md:w-[600px] object-contain drop-shadow-xl"
              />
            </div>
            <span className="archive-title-word block origin-center will-change-transform font-sans font-black text-gta-brown text-2xl md:text-4xl tracking-[0.2em] uppercase">
              ACCESSING LCPD DATABASE...
            </span>
          </div>
        </div>
      </section>

    <section ref={wrapperRef} className="relative w-full h-screen bg-[#020202] overflow-hidden font-gta-hud z-[10000] selection:bg-cyan-900 selection:text-cyan-100">
       
       {/* THE ENTIRE LCPD TERMINAL THAT SCALES UP TO FULL SCREEN */}
       <div ref={terminalRef} className="absolute inset-0 w-full h-full bg-[#05051a] flex flex-col will-change-transform origin-center z-[10000] shadow-[inset_0_0_150px_rgba(0,0,0,1)] pointer-events-auto overflow-hidden">
          
          {/* Scanlines / CRT Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('/noise.png')] mix-blend-overlay z-[100]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[100] animate-crt-scroll" />
          
          {!isAuthenticated ? (
             <div className="w-full h-full flex flex-col items-center justify-center font-gta-hud relative z-20">
               <div className="flex flex-col items-center">
                 <img src="/lcpd_hd_logo_by_interglobalfilms_d4eq983-375w-2x.png" className="w-40 h-48 mb-8 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
                 <h1 className="text-[#ffcc00] text-5xl tracking-widest mb-2 drop-shadow-[2px_2px_0_#000]">LCPD SECURE NETWORK</h1>
                 <div className="text-[#3399ff] text-xl tracking-widest uppercase font-bold drop-shadow-[1px_1px_0_#000] mb-16">
                   RESTRICTED ACCESS ONLY
                 </div>

                 {loginStep === 'LOGIN' || loginStep === 'DENIED' ? (
                   <div className="flex flex-col items-center">
                     <div className="text-white text-2xl tracking-widest mb-4">ENTER AUTHORIZATION CODE:</div>
                     <div className="relative">
                       <input 
                         ref={loginInputRef}
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             playHoverSound();
                             setLoginStep('AUTHENTICATING');
                             setTimeout(() => {
                               if (password.trim().length > 0) {
                                 setLoginStep('GRANTED');
                                 playHoverSound();
                                 setTimeout(() => setIsAuthenticated(true), 1500);
                               } else {
                                 setLoginStep('DENIED');
                                 setHintVisible(true);
                                 setPassword('');
                                 playHoverSound();
                               }
                             }, 1500);
                           }
                         }}
                         className="lcpd-login bg-transparent border-b-4 border-[#ffcc00] text-[#ffcc00] text-4xl tracking-[0.5em] text-center w-64 outline-none placeholder-gray-800 focus:bg-white/5 transition-colors"
                         placeholder="*****"
                         maxLength={10}
                       />
                     </div>
                     {loginStep === 'DENIED' && (
                       <div className="text-red-500 text-xl tracking-widest mt-6 animate-pulse">
                         ACCESS DENIED. UNAUTHORIZED ATTEMPT LOGGED.
                       </div>
                     )}
                     <div className="text-[#3399ff]/60 text-sm mt-8 font-mono tracking-widest text-center leading-relaxed">
                       [SYSTEM HINT: AUTHORIZATION CODE IS '12345']<br/>
                       [NAVIGATION: ARROWS TO MOVE / ENTER TO SELECT / BACKSPACE TO GO BACK]
                     </div>
                   </div>
                 ) : loginStep === 'AUTHENTICATING' ? (
                   <div className="text-[#ffcc00] text-3xl tracking-widest animate-pulse mt-8">
                     VERIFYING CREDENTIALS...
                   </div>
                 ) : (
                   <div className="text-green-500 text-4xl tracking-widest drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] mt-8">
                     ACCESS GRANTED. WELCOME, DETECTIVE.
                   </div>
                 )}
               </div>
             </div>
           ) : (
             <>
               {/* LCPD Top Header (Yellow Line & Logo) */}
               <div className="w-full relative mt-16 md:mt-24 z-20">
                 <div className="w-full h-3 bg-[#ffcc00] relative drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                   {/* Floating Police Badge */}
                   <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 w-[60px] h-[80px] md:w-[110px] md:h-[130px] z-30 drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)]">
                     <img src="/lcpd_hd_logo_by_interglobalfilms_d4eq983-375w-2x.png" alt="LCPD Badge" className="w-full h-full object-contain" />
                   </div>
          
              {/* Header Text */}
              <div className="absolute bottom-3 right-4 md:right-16 flex flex-col items-end">
                <h1 className="text-white text-lg md:text-5xl font-gta-hud tracking-[0.1em] drop-shadow-[3px_3px_0_#000]">
                  LIBERTY CITY POLICE DEPT.
                </h1>
              </div>
            </div>
            <div className="flex justify-end pr-4 md:pr-16 mt-2">
              <div className="text-[#3399ff] text-[10px] md:text-sm tracking-widest uppercase font-bold drop-shadow-[1px_1px_0_#000]">
                PROTECTING LIBERTY CITY
              </div>
            </div>
          </div>

          {/* Main Content Area (Two Columns) */}
          <div className="flex flex-col md:flex-row flex-1 w-full px-6 md:px-16 pt-8 md:pt-16 pb-32 md:pb-24 z-20 relative overflow-y-auto custom-scrollbar">
            
            {/* ---------------- ROOT VIEW ---------------- */}
            {(currentView === 'ROOT' || currentView === 'HELP') && (
              <>
                <div className="w-full md:w-1/2 flex flex-col md:pr-8 h-full mb-8 md:mb-0 shrink-0">
                  <h2 className="text-[#ffcc00] text-3xl font-gta-hud tracking-widest mb-4 drop-shadow-[2px_2px_0_#000]">
                    {currentView === 'ROOT' ? 'LCPD MAIN TERMINAL' : 'EMERGENCY COMMS'}
                  </h2>
                  <p className="text-white font-sans text-lg mb-8 max-w-lg leading-relaxed">
                    {currentView === 'ROOT' 
                      ? 'Select a module to access LCPD secure networks. Unauthorized access will be traced and prosecuted.'
                      : 'Establish a secure connection with external operatives. (Press BACKSPACE to return)'}
                  </p>

                  <div className="flex flex-col font-sans text-xl font-bold">
                    {currentView === 'ROOT' && ['EVIDENCE FILES', 'SYSTEM TERMINAL', 'CALL FOR HELP'].map((item, idx) => {
                      const isActive = rootActiveIndex === idx;
                      return (
                        <button 
                          key={item}
                          onClick={() => {
                            setRootActiveIndex(idx);
                            if (idx === 0) setCurrentView('FILES');
                            else if (idx === 1) setCurrentView('TERMINAL');
                            else if (idx === 2) setCurrentView('HELP');
                            playHoverSound();
                          }}
                          onMouseEnter={() => { setRootActiveIndex(idx); playHoverSound(); }}
                          className={`text-left flex items-center group relative w-max py-4 my-2 transition-colors ${isActive ? 'text-white' : 'text-[#3399ff] hover:text-white'}`}
                        >
                          <div className="w-8 flex justify-center absolute -left-8">
                            {isActive && <span className="text-white text-2xl animate-pulse">★</span>}
                          </div>
                          <span className="tracking-widest">[{idx + 1}] {item}</span>
                        </button>
                      )
                    })}

                    {currentView === 'HELP' && SOCIAL_LINKS.map((item, idx) => {
                      const isActive = helpActiveIndex === idx;
                      return (
                        <button 
                          key={item.name}
                          onClick={() => {
                            setHelpActiveIndex(idx);
                            window.open(item.url, '_blank');
                            playHoverSound();
                          }}
                          onMouseEnter={() => { setHelpActiveIndex(idx); playHoverSound(); }}
                          className={`text-left flex items-center group relative w-max py-4 my-2 transition-colors ${isActive ? 'text-white' : 'text-[#3399ff] hover:text-white'}`}
                        >
                          <div className="w-8 flex justify-center absolute -left-8">
                            {isActive && <span className="text-white text-2xl animate-pulse">▶</span>}
                          </div>
                          <span className="tracking-widest">{item.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right Side: Generic Status */}
                <div className="hidden md:flex w-full md:w-1/2 border-t-2 md:border-t-0 md:border-l-2 border-[#ffcc00]/20 pt-8 md:pt-0 pl-0 md:pl-8 h-full flex-col items-center justify-center opacity-50 mt-8 md:mt-0">
                  <div className="text-center font-mono text-[#3399ff] text-xl md:text-2xl">
                    <p className="mb-4">SYSTEM STATUS: <span className="text-green-500">ONLINE</span></p>
                    <p className="mb-4">ENCRYPTION: 256-BIT AES</p>
                    <p className="mb-4 animate-pulse text-[#ffcc00]">MONITORING ACTIVE</p>
                  </div>
                </div>
              </>
            )}

            {/* ---------------- TERMINAL VIEW ---------------- */}
            {currentView === 'TERMINAL' && (
              <div className="w-full flex flex-col h-full font-mono text-[#3399ff] text-xl bg-black/80 p-8 border border-[#3399ff]/30 shadow-[0_0_50px_rgba(51,153,255,0.1)]">
                <div className="mb-6 pb-2 border-b border-[#ffcc00]/30 text-[#ffcc00] flex justify-between tracking-widest font-bold">
                  <span>LCPD COMMAND LINE INTERFACE</span>
                  <span className="animate-pulse">[BACKSPACE TO EXIT]</span>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar pr-4 flex flex-col justify-end">
                  <div className="flex flex-col gap-2">
                    {terminalHistory.map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap">{line}</div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center mt-2 border-t border-[#3399ff]/30 pt-4">
                  <span className="mr-3 font-bold">C:\LCPD&gt;</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        playHoverSound();
                        const cmd = terminalInput.trim().toLowerCase();
                        const newHistory = [...terminalHistory, `C:\\LCPD> ${terminalInput}`];
                        if (cmd === 'help') newHistory.push('Commands: help, clear, ls, whoami, date, ping, exit');
                        else if (cmd === 'clear') { setTerminalHistory([]); setTerminalInput(''); return; }
                        else if (cmd === 'ls') newHistory.push('DIR: /projects\nDIR: /suspects\nDIR: /evidence');
                        else if (cmd === 'whoami') newHistory.push('ADMIN: Detective Ibraheem Shaheen');
                        else if (cmd === 'date') newHistory.push(new Date().toString());
                        else if (cmd.startsWith('ping')) newHistory.push('Pinging network...\nReply from 192.168.1.1: bytes=32 time=1ms TTL=64\nReply from 192.168.1.1: bytes=32 time=1ms TTL=64');
                        else if (cmd === 'exit') { setCurrentView('ROOT'); playHoverSound(); }
                        else if (cmd !== '') newHistory.push(`'${cmd}' is not recognized as an internal or external command.`);
                        
                        setTerminalHistory(newHistory);
                        setTerminalInput('');
                      } else if (e.key === 'Backspace' && terminalInput === '') {
                        setCurrentView('ROOT');
                        playHoverSound();
                      }
                    }}
                    className="lcpd-terminal-input bg-transparent flex-1 outline-none text-white focus:border-none uppercase"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            {/* ---------------- FILES VIEW ---------------- */}
            {currentView === 'FILES' && (
              <>
            {/* Left Column: Project List */}
            <div className="w-full md:w-1/2 flex flex-col md:pr-8 h-full mb-8 md:mb-0 shrink-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-4 gap-2">
                <h2 className="text-[#ffcc00] text-2xl md:text-3xl font-gta-hud tracking-widest drop-shadow-[2px_2px_0_#000]">
                  {expandedMissionIndex !== null ? 'EVIDENCE FILES' : 'CURRENT CRIMES'}
                </h2>
                <span className="text-[#3399ff] text-xs md:text-sm font-bold tracking-widest hidden md:block">[BACKSPACE: BACK]</span>
              </div>
              <p className="text-white font-sans text-sm md:text-lg mb-4 md:mb-8 max-w-lg leading-relaxed">
                {expandedMissionIndex !== null 
                  ? `Browsing restricted files for: ${MISSIONS[expandedMissionIndex].title}.` 
                  : 'The following crimes have been reported. Select one to dispatch to.'}
              </p>

              <h3 className="text-[#ffcc00] text-xl font-sans mb-6">
                {expandedMissionIndex !== null ? `// ROOT / ${MISSIONS[expandedMissionIndex].title.replace(/\s+/g, '_')} /` : 'Incident Reported'}
              </h3>

              <div className="flex flex-col font-sans text-lg font-bold pr-4 pb-10 relative">
                {visibleItems.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  if (item.type === 'MISSION') {
                    const isExpanded = expandedMissionIndex === item.index;
                    return (
                      <button 
                        key={`mission-${item.index}`}
                        onClick={() => { setActiveIndex(idx); setExpandedMissionIndex(isExpanded ? null : item.index); playHoverSound(); }}
                        onMouseEnter={() => { setActiveIndex(idx); playHoverSound(); }}
                        className={`text-left flex items-center group relative w-max py-2 my-1 ${isExpanded ? 'border-b border-gray-800 w-full mb-2' : ''}`}
                      >
                        <div className="w-8 flex justify-center absolute -left-8">
                          {isActive && <span className="text-white text-xl drop-shadow-[0_0_5px_white] animate-pulse">★</span>}
                        </div>
                        <span className={`transition-colors duration-200 tracking-wide flex items-center gap-2 ${isActive ? "text-white" : "text-[#3399ff] group-hover:text-white"}`}>
                          <span className="text-[12px] opacity-70">{isExpanded ? '▼' : '▶'}</span> {item.mission.title}
                        </span>
                      </button>
                    );
                  } else {
                    return (
                      <button 
                        key={`file-${item.missionIndex}-${item.fileIndex}`}
                        onClick={() => { 
                          setActiveIndex(idx); 
                          playHoverSound(); 
                          if (item.fileIndex === -1) setFullScreenState({ missionIndex: item.missionIndex, imageIndex: 0 }); 
                          else setSelectedFile({ missionIndex: item.missionIndex, fileIndex: item.fileIndex });
                        }}
                        onMouseEnter={() => { setActiveIndex(idx); playHoverSound(); }}
                        className={`text-left flex items-center group relative w-3/4 ml-6 py-1.5 my-0.5 border-l-2 pl-4 transition-all ${isActive ? 'border-[#ffcc00] bg-white/5' : 'border-[#3399ff]/30'}`}
                      >
                        <div className="w-8 flex justify-center absolute -left-12">
                          {isActive && <span className="text-white text-sm animate-pulse">▶</span>}
                        </div>
                        <div className={`flex justify-between w-full transition-colors duration-200 tracking-wide text-sm ${isActive ? "text-white" : "text-[#3399ff] group-hover:text-white"}`}>
                          <span>{item.file.name}</span>
                          <span className={`text-xs font-mono ${item.file.size === 'ENCRYPTED' ? 'text-red-500 animate-pulse' : item.file.size === 'EXE' ? 'text-[#ffcc00]' : 'opacity-50'}`}>
                            {item.file.size}
                          </span>
                        </div>
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            {/* Right Column: Surveillance Photo (Project Image) */}
            <div className="w-full md:w-1/2 flex flex-col h-full border-t-2 md:border-t-0 md:border-l-2 border-gray-800/50 pt-8 md:pt-0 pl-0 md:pl-12 relative group">
              <div className="absolute top-4 right-4 z-30 flex flex-col items-end">
                <span className="text-red-500 font-gta-hud tracking-widest text-xl animate-pulse drop-shadow-[2px_2px_0_#000]">● REC</span>
                <span className="text-white font-mono bg-black/50 px-2 mt-1">LCPD CCTV - CAM 04</span>
              </div>
              
              <div className="relative w-full h-[250px] md:h-[400px] border-4 border-gray-800 bg-black overflow-hidden mt-8 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
                {/* CRT Glitch overlay on image */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay z-20 pointer-events-none" />
                
                {(() => {
                  const activeMissionData = visibleItems[activeIndex]?.type === 'MISSION' 
                    ? visibleItems[activeIndex].mission 
                    : MISSIONS[visibleItems[activeIndex]?.missionIndex ?? 0];
                  
                  return activeMissionData ? (
                    <img 
                      src={encodeURI(`/${activeMissionData.images[0]}`)}
                      alt={activeMissionData.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10"
                      style={{ filter: 'grayscale(30%) contrast(120%) brightness(0.9) sepia(20%)' }}
                    />
                  ) : null;
                })()}
              </div>

              <div className="mt-6 bg-black/50 p-6 border border-gray-800 flex flex-col gap-2 relative">
                <div className="text-[#ffcc00] font-bold text-xl tracking-widest font-gta-hud">
                  {selectedFile ? 'FILE CONTENTS:' : 'SUSPECT DOSSIER:'}
                </div>
                <div className={`text-white font-sans text-sm leading-relaxed max-w-xl ${selectedFile ? 'font-mono text-xs opacity-70 whitespace-pre-wrap' : ''}`}>
                  {(() => {
                    const activeMissionData = visibleItems[activeIndex]?.type === 'MISSION' 
                      ? visibleItems[activeIndex].mission 
                      : MISSIONS[visibleItems[activeIndex]?.missionIndex ?? 0];

                    if (!selectedFile) return activeMissionData?.desc;

                    const file = MOCK_FILES[selectedFile.fileIndex];
                    if (!file) return 'FILE NOT FOUND';
                    
                    return `> Reading ${file.name}...\n> Status: ${file.size === 'ENCRYPTED' ? 'ACCESS DENIED' : 'DECRYPTING...'}\n\n[ RAW HEX DUMP ]\n0x00FA: 4A 6F 68 6E 20 44 6F\n0x00FB: 65 20 77 61 73 20 68\n0x00FC: 65 72 65 2E 20 54 68\n0x00FD: 69 73 20 69 73 20 61\n0x00FE: 20 73 65 63 72 65 74\n0x00FF: 20 6D 65 73 73 61 67`;
                  })()}
                </div>
              </div>
            </div>
              </>
            )}
          </div>

          {/* Bottom Footer Line & Controls */}
          {currentView === 'FILES' && (
            <div className="w-full mt-auto pb-12 pt-8 z-20 relative hidden md:block">
              <div className="w-full h-2 bg-[#ffcc00] drop-shadow-[0_-2px_5px_rgba(0,0,0,0.5)] mb-4" />
              <div className="flex justify-center items-center gap-16 px-16 text-white font-sans font-bold text-sm">
                <div className="flex items-center gap-2">
                  <span className="border border-white px-2 rounded-sm bg-black text-white text-xs">↑</span>
                  <span className="border border-white px-2 rounded-sm bg-black text-white text-xs">↓</span>
                  Move
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-white px-2 rounded-sm bg-black text-white text-xs">ENTER</span>
                  Select / Toggle
                </div>
                {expandedMissionIndex !== null && (
                  <div className="flex items-center gap-2">
                    <span className="border border-white px-2 rounded-sm bg-black text-white text-xs">BACKSPACE</span>
                    Collapse Folder
                  </div>
                )}
              </div>
            </div>
          )}

          </>
        )}

       </div>

       {/* Mobile Virtual D-Pad */}
       {isAuthenticated && (
         <div className="absolute bottom-6 right-6 z-[9000] flex flex-col items-center gap-2 md:hidden opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
           <button onClick={(e) => { e.stopPropagation(); dispatchKey('ArrowUp'); }} className="w-12 h-12 bg-black/80 border-2 border-[#ffcc00] rounded flex items-center justify-center text-[#ffcc00] active:bg-[#ffcc00] active:text-black text-xl">▲</button>
           <div className="flex gap-2">
             <button onClick={(e) => { e.stopPropagation(); dispatchKey('ArrowLeft'); }} className="w-12 h-12 bg-black/80 border-2 border-[#ffcc00] rounded flex items-center justify-center text-[#ffcc00] active:bg-[#ffcc00] active:text-black text-xl">◀</button>
             <button onClick={(e) => { e.stopPropagation(); dispatchKey('Enter'); }} className="w-12 h-12 bg-[#ffcc00]/20 border-2 border-[#ffcc00] rounded flex items-center justify-center text-[#ffcc00] font-bold active:bg-[#ffcc00] active:text-black text-sm">SEL</button>
             <button onClick={(e) => { e.stopPropagation(); dispatchKey('ArrowRight'); }} className="w-12 h-12 bg-black/80 border-2 border-[#ffcc00] rounded flex items-center justify-center text-[#ffcc00] active:bg-[#ffcc00] active:text-black text-xl">▶</button>
           </div>
           <button onClick={(e) => { e.stopPropagation(); dispatchKey('ArrowDown'); }} className="w-12 h-12 bg-black/80 border-2 border-[#ffcc00] rounded flex items-center justify-center text-[#ffcc00] active:bg-[#ffcc00] active:text-black text-xl">▼</button>
           <button onClick={(e) => { e.stopPropagation(); dispatchKey('Backspace'); }} className="mt-2 px-6 py-3 bg-black/80 border-2 border-red-500 rounded text-red-500 text-sm font-bold active:bg-red-500 active:text-black tracking-widest">BACK</button>
         </div>
       )}

       {/* Fullscreen Image Overlay */}
       {fullScreenState && (
         <div 
           className="fixed inset-0 z-[99999] bg-[#020202] flex flex-col items-center justify-center p-8 cursor-pointer"
           onClick={() => { setFullScreenState(null); playHoverSound(); }}
         >
           <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[#ffcc00] font-gta-hud tracking-widest text-lg md:text-2xl animate-pulse z-50 drop-shadow-[2px_2px_0_#000]">
             [ BACKSPACE ] TO CLOSE
           </div>

           <div className="absolute bottom-4 md:bottom-8 text-white font-gta-hud tracking-widest text-sm md:text-xl z-50 flex gap-4 md:gap-8">
             <span className="animate-pulse">◀ FLIP</span>
             <span>IMAGE {fullScreenState.imageIndex + 1} OF {MISSIONS[fullScreenState.missionIndex].images.length}</span>
             <span className="animate-pulse">FLIP ▶</span>
           </div>
           
           {/* CRT Overlays for Fullscreen */}
           <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('/noise.png')] mix-blend-overlay z-10" />
           <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 animate-crt-scroll" />
           
           <img 
             src={encodeURI(`/${MISSIONS[fullScreenState.missionIndex].images[fullScreenState.imageIndex]}`)} 
             alt="Fullscreen Evidence" 
             className="max-w-[95vw] md:max-w-[90vw] max-h-[85vh] object-contain z-20 shadow-[0_0_50px_rgba(255,255,255,0.1)] border-2 md:border-4 border-gray-800" 
             style={{ filter: 'grayscale(10%) contrast(110%) brightness(0.9)' }}
             onClick={(e) => {
               e.stopPropagation();
               setFullScreenState(prev => {
                 if (!prev) return null;
                 const images = MISSIONS[prev.missionIndex].images;
                 return { ...prev, imageIndex: (prev.imageIndex + 1) % images.length };
               });
               playHoverSound();
             }}
           />
         </div>
       )}

    </section>
    </div>
  );
}
