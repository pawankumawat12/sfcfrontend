// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "./App.css";
// import Navbar from "./pages/frontend/Navbar/Navbar";
// import HeroSlider from "./pages/frontend/HeroSlider/HeroSlider";
// import Categories from "./pages/frontend/Categories/Categories";
// import OurCafes from "./pages/frontend/OurCafes/OurCafes";
// import AboutUs from "./pages/frontend/AboutUs/AboutUs";
// import Contact from "./pages/frontend/ContactUs/ContactUs";
// import Footer from "./pages/frontend/Footer/Footer";
// import ShowProduct from "./pages/frontend/Products/ShowProduct";
// import AdminRoutes from "./routes/AdminRoute";
// import SignIn from "./pages/frontend/Auth/SignIn";
// import Signup from "./pages/frontend/Auth/SignUp";
// import { useDispatch } from "react-redux";
// import { useVerifyQuery } from "./redux/services/authApi";
// import { useEffect } from "react";
// import { setCredentials } from "./redux/features/authSlice";
// import PublicRoute from "./components/validRoute/PublicRoute";

// function App() {
//   const dispatch = useDispatch();
//   const { data, isLoading } = useVerifyQuery();

//   useEffect(() => {
//     dispatch(setCredentials(data?.user));
//   }, [data]);

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="dark"
//       />

//       <BrowserRouter>
//         {/* Frontend Navbar */}
//         <Routes>
//           {/* FRONTEND */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Navbar />
//                 <HeroSlider />
//                 <Categories />
//                 <OurCafes />
//                 <AboutUs />
//                 <Contact />
//                 <Footer />
//               </>
//             }
//           />

//           <Route
//             path="/signin"
//             element={
//               <PublicRoute>
//                 <SignIn />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <PublicRoute>
//                 <Signup />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/product/:slug"
//             element={
//               <>
//                 <Navbar />
//                 <ShowProduct />
//                 <Footer />
//               </>
//             }
//           />

//           {/* ADMIN */}
//           <Route path="/admin/*" element={<AdminRoutes />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { useState, useEffect, useCallback, useContext, createContext, useRef } from "react";

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
// const G = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap');

//     *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

//     :root{
//       --brand:#FF5C35; --brand2:#FF8C42; --brand-glow:rgba(255,92,53,0.2);
//       --gold:#F5C842; --emerald:#00C896; --sapphire:#3D8EFF; --violet:#7C5CFF;
//       --bg:#F5F2ED; --bg2:#FFFFFF; --bg3:#EDE8DF; --card:#FFFFFF; --card2:#F5F2ED;
//       --border:rgba(0,0,0,0.07); --border2:rgba(0,0,0,0.12);
//       --text:#19160F; --text2:#3C3830; --text3:#78726A; --text4:#B0A89E;
//       --sh1:0 2px 8px rgba(0,0,0,0.05); --sh2:0 4px 20px rgba(0,0,0,0.08); --sh3:0 12px 48px rgba(0,0,0,0.11); --sh4:0 24px 80px rgba(0,0,0,0.14);
//       --r1:8px; --r2:14px; --r3:20px; --r4:28px; --r5:40px;
//       --fd:'Syne',sans-serif; --fb:'Instrument Sans',sans-serif; --fm:'JetBrains Mono',monospace;
//       --ease:cubic-bezier(.4,0,.2,1); --spring:cubic-bezier(.34,1.56,.64,1);
//     }
//     [data-theme=dark]{
//       --bg:#0D0C0A; --bg2:#141210; --bg3:#1B1916; --card:#171512; --card2:#1F1D19;
//       --border:rgba(255,255,255,0.06); --border2:rgba(255,255,255,0.1);
//       --text:#F0EAE0; --text2:#C4BDB3; --text3:#75706A; --text4:#46433E;
//       --sh1:0 2px 8px rgba(0,0,0,0.4); --sh2:0 4px 20px rgba(0,0,0,0.5); --sh3:0 12px 48px rgba(0,0,0,0.6); --sh4:0 24px 80px rgba(0,0,0,0.7);
//     }

//     html{scroll-behavior:smooth}
//     body{font-family:var(--fb);background:var(--bg);color:var(--text);min-height:100vh;transition:background .3s,color .3s}
//     a{text-decoration:none;color:inherit}
//     button{font-family:var(--fb)}

//     ::-webkit-scrollbar{width:4px;height:4px}
//     ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:99px}

//     @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
//     @keyframes fadeIn{from{opacity:0}to{opacity:1}}
//     @keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
//     @keyframes spin{to{transform:rotate(360deg)}}
//     @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
//     @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
//     @keyframes toastSlide{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
//     @keyframes pulse2{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
//     @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

//     .fu{animation:fadeUp .45s .05s both}
//     .fu2{animation:fadeUp .45s .15s both}
//     .fu3{animation:fadeUp .45s .25s both}
//     .fu4{animation:fadeUp .45s .35s both}
//     .sci{animation:scaleIn .3s both}

//     .sk{background:linear-gradient(90deg,var(--bg3) 25%,var(--card2) 50%,var(--bg3) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:var(--r2)}

//     canvas{display:block;touch-action:none}

//     @media(max-width:768px){.hm{display:none!important}}
//     @media(min-width:769px){.hd{display:none!important}}
//   `}</style>
// );

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

    *,*::before,*::after{
      box-sizing:border-box;
      margin:0;
      padding:0;
    }

    :root{
      --brand:#FF5C35; --brand2:#FF8C42; --brand-glow:rgba(255,92,53,0.2);
      --gold:#F5C842; --emerald:#00C896; --sapphire:#3D8EFF; --violet:#7C5CFF;
      --bg:#F5F2ED; --bg2:#FFFFFF; --bg3:#EDE8DF; --card:#FFFFFF; --card2:#F5F2ED;
      --border:rgba(0,0,0,0.07); --border2:rgba(0,0,0,0.12);
      --text:#19160F; --text2:#3C3830; --text3:#78726A; --text4:#B0A89E;

      /* improved shadows */
      --sh1:0 1px 3px rgba(0,0,0,0.04);
      --sh2:0 8px 28px rgba(0,0,0,0.08);
      --sh3:0 18px 60px rgba(0,0,0,0.12);
      --sh4:0 30px 100px rgba(0,0,0,0.16);

      --r1:10px; --r2:16px; --r3:22px; --r4:30px; --r5:42px;

      /* 🔥 NEW FONTS */
      --fd:'Plus Jakarta Sans',sans-serif;
      --fb:'Manrope',sans-serif;
      --fm:'JetBrains Mono',monospace;

      --ease:cubic-bezier(.4,0,.2,1);
      --spring:cubic-bezier(.34,1.56,.64,1);
    }

    [data-theme=dark]{
      --bg:#0D0C0A; --bg2:#141210; --bg3:#1B1916; --card:#171512; --card2:#1F1D19;
      --border:rgba(255,255,255,0.06); --border2:rgba(255,255,255,0.1);
      --text:#F0EAE0; --text2:#C4BDB3; --text3:#75706A; --text4:#46433E;

      --sh1:0 2px 8px rgba(0,0,0,0.4);
      --sh2:0 10px 30px rgba(0,0,0,0.5);
      --sh3:0 20px 70px rgba(0,0,0,0.6);
      --sh4:0 40px 120px rgba(0,0,0,0.7);
    }

    html{
      scroll-behavior:smooth;
      -webkit-font-smoothing:antialiased;
    }

    body{
      font-family:var(--fb);
      background:var(--bg);
      color:var(--text);
      min-height:100vh;
      transition:background .3s ease,color .3s ease;
      line-height:1.5;
      letter-spacing:-0.1px;
    }

    h1,h2,h3,h4{
      font-family:var(--fd);
      letter-spacing:-0.3px;
    }

    a{
      text-decoration:none;
      color:inherit;
      transition:opacity .2s;
    }

    a:hover{
      opacity:.7;
    }

    button{
      font-family:var(--fb);
      cursor:pointer;
      transition:all .2s var(--ease);
    }

    button:active{
      transform:scale(.97);
    }

    ::-webkit-scrollbar{
      width:4px;
      height:4px;
    }

    ::-webkit-scrollbar-thumb{
      background:var(--border2);
      border-radius:99px;
    }

    /* 🔥 Premium Animations */
    @keyframes fadeUp{
      from{opacity:0;transform:translateY(24px)}
      to{opacity:1;transform:translateY(0)}
    }

    @keyframes fadeIn{
      from{opacity:0}
      to{opacity:1}
    }

    @keyframes scaleIn{
      from{opacity:0;transform:scale(.96)}
      to{opacity:1;transform:scale(1)}
    }

    @keyframes shimmer{
      0%{background-position:200% 0}
      100%{background-position:-200% 0}
    }

    .fu{animation:fadeUp .5s var(--ease) both}
    .fu2{animation:fadeUp .5s .1s both}
    .fu3{animation:fadeUp .5s .2s both}
    .fu4{animation:fadeUp .5s .3s both}

    .sci{animation:scaleIn .28s var(--ease) both}

    /* 🔥 Better skeleton */
    .sk{
      background:linear-gradient(
        90deg,
        var(--bg3) 20%,
        var(--card2) 50%,
        var(--bg3) 80%
      );
      background-size:200% 100%;
      animation:shimmer 1.2s infinite;
      border-radius:var(--r2);
    }

    canvas{
      display:block;
      touch-action:none;
    }

    /* responsive helpers */
    @media(max-width:768px){
      .hm{display:none!important}
    }

    @media(min-width:769px){
      .hd{display:none!important}
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CAFES = [
  {id:"cafe_001",name:"The Roasted Bean",rating:4.7,reviews:1243,cuisine:"Specialty Coffee",address:"12 Elm St, Brooklyn",city:"New York",image:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80",banner:"https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1400&q=80",logo:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80",tags:["Specialty","Vegan","WiFi"],priceRange:"$$",isOpen:true,openTime:"7AM",closeTime:"10PM",phone:"+1 718-555-0101",email:"hello@roastedbean.com",desc:"Brooklyn's finest single-origin roastery. We source beans from Ethiopia, Colombia & Guatemala, roasted fresh weekly.",ownerId:"owner_001",featured:true,category:"Coffee Shop",deliveryTime:"20-30 min",color:"#FF5C35",games:["snake","memory","wordscramble"]},
  {id:"cafe_002",name:"Brew & Bloom",rating:4.5,reviews:892,cuisine:"Artisan Coffee & Florals",address:"45 Park Ave, Manhattan",city:"New York",image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=80",banner:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80",logo:"https://images.unsplash.com/photo-1507226983735-a838615193b0?w=300&q=80",tags:["Floral","Instagrammable","Live Music"],priceRange:"$$$",isOpen:true,openTime:"8AM",closeTime:"11PM",phone:"+1 212-555-0202",email:"hello@brewbloom.com",desc:"A garden café where art meets coffee. Every cup a masterpiece, every corner a photo opportunity.",ownerId:"owner_002",featured:true,category:"Artisan Café",deliveryTime:"15-25 min",color:"#E96B8A",games:["flappy","memory"]},
  {id:"cafe_003",name:"Dark Matter",rating:4.8,reviews:2101,cuisine:"Espresso & Brunch",address:"88 West Loop, Chicago",city:"Chicago",image:"https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=700&q=80",banner:"https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1400&q=80",logo:"https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=300&q=80",tags:["Award Winning","Brunch","Rooftop"],priceRange:"$$$",isOpen:true,openTime:"6:30AM",closeTime:"9PM",phone:"+1 312-555-0303",email:"hello@darkmatter.com",desc:"Chicago's most awarded espresso bar with a rooftop terrace and chef-curated brunch.",ownerId:"owner_003",featured:true,category:"Espresso Bar",deliveryTime:"25-35 min",color:"#7C5CFF",games:["snake","flappy","wordscramble"]},
  {id:"cafe_004",name:"Golden Hour",rating:4.6,reviews:678,cuisine:"All-Day Breakfast",address:"22 Melrose Ave, LA",city:"Los Angeles",image:"https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=700&q=80",banner:"https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1400&q=80",logo:"https://images.unsplash.com/photo-1572119865084-43c285814d63?w=300&q=80",tags:["Pet Friendly","Breakfast","Terrace"],priceRange:"$$",isOpen:false,openTime:"8AM",closeTime:"6PM",phone:"+1 213-555-0404",email:"hello@goldenhour.com",desc:"Catch the golden hour on our terrace overlooking the Hollywood Hills. All-day breakfast done right.",ownerId:"owner_004",featured:false,category:"Breakfast Café",deliveryTime:"20-30 min",color:"#F5C842",games:["memory","wordscramble"]},
  {id:"cafe_005",name:"Matcha Republic",rating:4.4,reviews:534,cuisine:"Japanese Tea",address:"9 Cherry Blossom Ln, SF",city:"San Francisco",image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&q=80",banner:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80",logo:"https://images.unsplash.com/photo-1565299715199-866c917206bb?w=300&q=80",tags:["Matcha","Japanese","Gluten Free"],priceRange:"$$",isOpen:true,openTime:"9AM",closeTime:"8PM",phone:"+1 415-555-0505",email:"hello@matcha.com",desc:"Authentic Japanese tea ceremony experience. Our matcha sourced directly from Uji.",ownerId:"owner_005",featured:true,category:"Tea House",deliveryTime:"30-40 min",color:"#00C896",games:["snake","memory"]},
  {id:"cafe_006",name:"Cortado Corner",rating:4.3,reviews:321,cuisine:"Spanish Coffee",address:"55 Bourbon St, NOLA",city:"New Orleans",image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&q=80",banner:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80",logo:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80",tags:["Spanish","Jazz","Outdoor"],priceRange:"$",isOpen:true,openTime:"7:30AM",closeTime:"10:30PM",phone:"+1 504-555-0606",email:"hello@cortado.com",desc:"Authentic Spanish cortado in the jazz capital of the world. Live music every Friday.",ownerId:"owner_006",featured:false,category:"Coffee Bar",deliveryTime:"15-20 min",color:"#FF8C42",games:["flappy","wordscramble"]},
  {id:"cafe_007",name:"The Velvet Cup",rating:4.9,reviews:3204,cuisine:"Luxury Coffee",address:"1 Fifth Ave, NYC",city:"New York",image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80",banner:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80",logo:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&q=80",tags:["Luxury","Private Rooms","Wine"],priceRange:"$$$$",isOpen:true,openTime:"10AM",closeTime:"12AM",phone:"+1 212-555-0707",email:"hello@velvetcup.com",desc:"NY's most exclusive coffee experience. Hand-selected micro-lots, private tasting rooms.",ownerId:"owner_007",featured:true,category:"Luxury Café",deliveryTime:"40-50 min",color:"#C9A84C",games:["memory","snake","flappy"]},
  {id:"cafe_008",name:"Sunrise Sips",rating:4.2,reviews:198,cuisine:"Health & Wellness",address:"77 Coconut Grove, Miami",city:"Miami",image:"https://images.unsplash.com/photo-1462024357290-0f3ff69de4a5?w=700&q=80",banner:"https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1400&q=80",logo:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&q=80",tags:["Healthy","Smoothies","Ocean View"],priceRange:"$$",isOpen:true,openTime:"6AM",closeTime:"8PM",phone:"+1 305-555-0808",email:"hello@sunrise.com",desc:"Miami's healthiest café with ocean views. Superfood beverages and acai bowls made fresh daily.",ownerId:"owner_008",featured:false,category:"Health Café",deliveryTime:"20-30 min",color:"#3D8EFF",games:["snake","wordscramble"]},
  {id:"cafe_009",name:"Beanstalk",rating:4.5,reviews:445,cuisine:"Farm-to-Cup",address:"33 Green St, Portland",city:"Portland",image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=700&q=80",banner:"https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1400&q=80",logo:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80",tags:["Organic","Farm-to-Table","Dog OK"],priceRange:"$$",isOpen:true,openTime:"7AM",closeTime:"7PM",phone:"+1 503-555-0909",email:"hello@beanstalk.com",desc:"Portland's most sustainable farm-to-cup café. 100% organic, zero waste, renewable energy.",ownerId:"owner_009",featured:false,category:"Eco Café",deliveryTime:"25-35 min",color:"#5CB85C",games:["memory","flappy"]},
  {id:"cafe_010",name:"Noir Espresso",rating:4.6,reviews:887,cuisine:"Dark Roast & Desserts",address:"66 Bourbon Lane, Austin",city:"Austin",image:"https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=700&q=80",banner:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1400&q=80",logo:"https://images.unsplash.com/photo-1462024357290-0f3ff69de4a5?w=300&q=80",tags:["Dark Roast","Dessert Bar","Events"],priceRange:"$$",isOpen:false,openTime:"9AM",closeTime:"11PM",phone:"+1 512-555-1010",email:"hello@noir.com",desc:"Austin's darkest, boldest espresso bar. Night owls, artists and dreamers welcome.",ownerId:"owner_010",featured:true,category:"Espresso Bar",deliveryTime:"20-30 min",color:"#9B59B6",games:["snake","memory","flappy","wordscramble"]},
];

const MENU_BASE = [
  {id:"m1",name:"Signature Espresso",desc:"Double shot award-winning blend",price:4.50,category:"Coffee",image:"https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=400&q=80",popular:true,veg:true,cal:5},
  {id:"m2",name:"Cold Brew Float",desc:"18hr cold brew with vanilla ice cream",price:6.50,category:"Coffee",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",popular:true,veg:true,cal:320},
  {id:"m3",name:"Avocado Toast",desc:"Sourdough, smashed avo, poached egg",price:12.00,category:"Food",image:"https://images.unsplash.com/photo-1603046891744-756763d495c9?w=400&q=80",popular:false,veg:true,cal:420},
  {id:"m4",name:"Almond Croissant",desc:"French croissant with almond paste",price:5.00,category:"Pastries",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",popular:true,veg:true,cal:380},
  {id:"m5",name:"Matcha Latte",desc:"Ceremonial matcha with oat milk",price:5.50,category:"Specials",image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",popular:false,veg:true,cal:140},
  {id:"m6",name:"Acai Bowl",desc:"Brazilian acai with granola & berries",price:14.00,category:"Food",image:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80",popular:false,veg:true,cal:510},
  {id:"m7",name:"Flat White",desc:"Ristretto shots with microfoam",price:4.00,category:"Coffee",image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",popular:false,veg:true,cal:60},
  {id:"m8",name:"Banana Bread",desc:"House-baked with walnut cream cheese",price:6.00,category:"Pastries",image:"https://images.unsplash.com/photo-1567537417706-f5c3f8a8c28b?w=400&q=80",popular:false,veg:true,cal:340},
];

const MENU_ITEMS = {};
CAFES.forEach(c => {
  MENU_ITEMS[c.id] = MENU_BASE.map(m=>({...m,id:`${c.id}_${m.id}`,price:+(m.price*(0.8+Math.random()*0.5)).toFixed(2)}));
});

const OFFERS_BASE = [
  {id:"o1",title:"Morning Rush",desc:"20% off any order before 10 AM",discount:"20% OFF",code:"MORNING20",validTill:"2025-12-31",type:"pct"},
  {id:"o2",title:"Buy 2 Get 1",desc:"Order 2 coffees, get 1 free",discount:"FREE Coffee",code:"B2G1FREE",validTill:"2025-11-30",type:"combo"},
  {id:"o3",title:"Weekend Brunch",desc:"Coffee + Pastry + Toast for $18",discount:"Save $6",code:"BRUNCH18",validTill:"2025-12-31",type:"combo"},
];
const OFFERS = {};
CAFES.forEach((c,i)=>{
  OFFERS[c.id]=OFFERS_BASE.map(o=>({...o,id:`${c.id}_${o.id}`,code:`${o.code}_${i+1}`}));
});

const USERS = [
  {id:"admin_001",name:"Alex Morgan",email:"admin@cafehub.com",role:"admin",avatar:"AM",joined:"Jan 2024"},
  {id:"sub_001",name:"Sam Rivera",email:"sam@cafehub.com",role:"subadmin",avatar:"SR",joined:"Mar 2024"},
  {id:"owner_001",name:"James Chen",email:"james@roastedbean.com",role:"owner",cafeId:"cafe_001",avatar:"JC",joined:"Feb 2024"},
  {id:"owner_002",name:"Priya Sharma",email:"priya@brewbloom.com",role:"owner",cafeId:"cafe_002",avatar:"PS",joined:"Feb 2024"},
  {id:"owner_003",name:"Marcus Webb",email:"marcus@darkmatter.com",role:"owner",cafeId:"cafe_003",avatar:"MW",joined:"Mar 2024"},
];

const GAMES_INFO = {
  snake:{id:"snake",name:"Snake Classic",icon:"🐍",desc:"Eat food, grow & avoid walls!",plays:"15K",cat:"Arcade"},
  memory:{id:"memory",name:"Memory Match",icon:"🧠",desc:"Find matching pairs to win!",plays:"23K",cat:"Puzzle"},
  flappy:{id:"flappy",name:"Flappy Cup",icon:"☕",desc:"Keep the coffee cup flying!",plays:"31K",cat:"Arcade"},
  wordscramble:{id:"wordscramble",name:"Word Scramble",icon:"📝",desc:"Unscramble coffee words!",plays:"8K",cat:"Word"},
};

const genQR = (cafeId) => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`${window.location.href.split('#')[0]}#/scan/${cafeId}`)}&bgcolor=FFFFFF&color=0D0C0A&margin=12`;

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const ThemeCtx = createContext(null);
const AuthCtx = createContext(null);
const ScanCtx = createContext(null);
const CartCtx = createContext(null);
const ToastCtx = createContext(null);

function ThemeProvider({children}) {
  const [dark,setDark]=useState(()=>localStorage.getItem("ch_theme")==="dark");
  const toggle=()=>setDark(d=>{const n=!d;localStorage.setItem("ch_theme",n?"dark":"light");return n;});
  useEffect(()=>{document.documentElement.setAttribute("data-theme",dark?"dark":"light");},[dark]);
  return <ThemeCtx.Provider value={{dark,toggle}}>{children}</ThemeCtx.Provider>;
}

function AuthProvider({children}) {
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("ch_user"));}catch{return null;}});
  const login=(email,pw)=>{
    const map={"admin@cafehub.com":{id:"admin_001",name:"Alex Morgan",email:"admin@cafehub.com",role:"admin",avatar:"AM"},
      "sam@cafehub.com":{id:"sub_001",name:"Sam Rivera",email:"sam@cafehub.com",role:"subadmin",avatar:"SR"},
      "james@roastedbean.com":{id:"owner_001",name:"James Chen",email:"james@roastedbean.com",role:"owner",cafeId:"cafe_001",avatar:"JC"},
      "priya@brewbloom.com":{id:"owner_002",name:"Priya Sharma",email:"priya@brewbloom.com",role:"owner",cafeId:"cafe_002",avatar:"PS"},
      "marcus@darkmatter.com":{id:"owner_003",name:"Marcus Webb",email:"marcus@darkmatter.com",role:"owner",cafeId:"cafe_003",avatar:"MW"}};
    const u=map[email];
    if(u&&pw==="pass123"){localStorage.setItem("ch_user",JSON.stringify(u));setUser(u);return{ok:true,user:u};}
    return{ok:false};
  };
  const logout=()=>{localStorage.removeItem("ch_user");setUser(null);};
  return <AuthCtx.Provider value={{user,login,logout}}>{children}</AuthCtx.Provider>;
}

function ScanProvider({children}) {
  const [sid,setSid]=useState(()=>sessionStorage.getItem("ch_scan"));
  const start=(id)=>{sessionStorage.setItem("ch_scan",id);setSid(id);};
  const exit=()=>{sessionStorage.removeItem("ch_scan");setSid(null);};
  return <ScanCtx.Provider value={{sid,start,exit}}>{children}</ScanCtx.Provider>;
}

function CartProvider({children}) {
  const [cart,setCart]=useState([]);
  const add=(item)=>setCart(p=>{const e=p.find(i=>i.id===item.id);return e?p.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i):[...p,{...item,qty:1}];});
  const del=(id)=>setCart(p=>p.filter(i=>i.id!==id));
  const upd=(id,q)=>{if(q<1){del(id);return;}setCart(p=>p.map(i=>i.id===id?{...i,qty:q}:i));};
  const clear=()=>setCart([]);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count=cart.reduce((s,i)=>s+i.qty,0);
  return <CartCtx.Provider value={{cart,add,del,upd,clear,total,count}}>{children}</CartCtx.Provider>;
}

function ToastProvider({children}) {
  const [toasts,setToasts]=useState([]);
  const show=useCallback((msg,type="success")=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200);
  },[]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div style={{position:"fixed",top:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:320}}>
        {toasts.map(t=>(
          <div key={t.id} style={{padding:"12px 18px",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,
            background:t.type==="success"?"#00C896":t.type==="error"?"#FF5C35":"#3D8EFF",
            boxShadow:"0 4px 20px rgba(0,0,0,0.2)",animation:"toastSlide .3s ease",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:15}}>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{"toast message"}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// hooks
const useTheme=()=>useContext(ThemeCtx);
const useAuth=()=>useContext(AuthCtx);
const useScan=()=>useContext(ScanCtx);
const useCart=()=>useContext(CartCtx);
const useToast=()=>useContext(ToastCtx);

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function useRoute() {
  const [path,setPath]=useState(()=>window.location.hash.slice(1)||"/");
  useEffect(()=>{const h=()=>setPath(window.location.hash.slice(1)||"/");window.addEventListener("hashchange",h);return()=>window.removeEventListener("hashchange",h);},[]);
  const nav=useCallback(to=>{window.location.hash=to;},[]);
  return{path,nav};
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Btn=({children,onClick,variant="primary",size="md",full=false,style:st={}})=>{
  const s={
    primary:{background:"var(--brand)",color:"#fff",border:"none"},
    secondary:{background:"var(--bg3)",color:"var(--text)",border:"1px solid var(--border2)"},
    ghost:{background:"transparent",color:"var(--text2)",border:"1px solid var(--border)"},
    dark:{background:"var(--text)",color:"var(--bg)",border:"none"},
    danger:{background:"#FF5C35",color:"#fff",border:"none"},
  };
  const sz={sm:{padding:"6px 14px",fontSize:12,borderRadius:8},md:{padding:"10px 20px",fontSize:13,borderRadius:10},lg:{padding:"14px 28px",fontSize:15,borderRadius:12},xl:{padding:"16px 36px",fontSize:16,borderRadius:14}};
  return <button onClick={onClick} style={{cursor:"pointer",fontWeight:600,fontFamily:"var(--fb)",width:full?"100%":"auto",transition:"all .2s",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,...s[variant],...sz[size],...st}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.opacity="0.9";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.opacity="1";}}>{children}</button>;
};

const Tag=({children,color="default",size="sm"})=>{
  const c={default:{bg:"var(--bg3)",color:"var(--text3)"},brand:{bg:"rgba(255,92,53,0.12)",color:"#FF5C35"},green:{bg:"rgba(0,200,150,0.12)",color:"#00C896"},gold:{bg:"rgba(245,200,66,0.15)",color:"#C9A400"},blue:{bg:"rgba(61,142,255,0.12)",color:"#3D8EFF"},violet:{bg:"rgba(124,92,255,0.12)",color:"#7C5CFF"},red:{bg:"rgba(255,92,53,0.1)",color:"#FF5C35"}};
  const sz={xs:{padding:"2px 7px",fontSize:10},sm:{padding:"3px 9px",fontSize:11},md:{padding:"5px 12px",fontSize:12}};
  return <span style={{display:"inline-flex",alignItems:"center",gap:3,borderRadius:99,fontWeight:600,letterSpacing:.3,...c[color],...sz[size]}}>{children}</span>;
};

const Stars=({r,size=13})=>(
  <span style={{display:"inline-flex",gap:1}}>
    {[1,2,3,4,5].map(s=>(
      <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s<=Math.round(r)?"#F5C842":"var(--border2)"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </span>
);

const Spin=()=><div style={{width:28,height:28,border:"2.5px solid var(--border2)",borderTopColor:"var(--brand)",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"40px auto"}} />;

const Sk=({h=16,w="100%",r=8})=><div className="sk" style={{height:h,width:w,borderRadius:r}} />;

function Modal({open,onClose,title,children,w=540}) {
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} className="sci" style={{background:"var(--card)",borderRadius:22,padding:28,width:"100%",maxWidth:w,boxShadow:"var(--sh4)",maxHeight:"88vh",overflowY:"auto",border:"1px solid var(--border)"}}>
        {title&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <h3 style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:700}}>{title}</h3>
          <button onClick={onClose} style={{border:"none",background:"var(--bg3)",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:17,color:"var(--text3)",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>}
        {children}
      </div>
    </div>
  );
}

function Inp({label,placeholder,value,onChange,type="text",style:st={}}) {
  return (
    <div style={{marginBottom:14}}>
      {label&&<label style={{display:"block",fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1px solid var(--border2)",fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none",transition:"border .2s",...st}}
        onFocus={e=>e.target.style.borderColor="var(--brand)"}
        onBlur={e=>e.target.style.borderColor="var(--border2)"} />
    </div>
  );
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle({size=32}) {
  const {dark,toggle}=useTheme();
  return (
    <button onClick={toggle} style={{width:size,height:size,borderRadius:size/2,border:"1px solid var(--border2)",background:"var(--bg3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.45,transition:"all .2s",flexShrink:0}}
      title={dark?"Switch to Light":"Switch to Dark"}>
      {dark?"☀️":"🌙"}
    </button>
  );
}

// ─── QR SYSTEM ────────────────────────────────────────────────────────────────
function QRCode({cafeId,size=160}) {
  return <img src={genQR(cafeId)} alt="QR" style={{width:size,height:size,borderRadius:10,display:"block"}} />;
}

// ═══════════════════════════════════════════════════════
// GAMES ENGINE
// ═══════════════════════════════════════════════════════

// ── SNAKE GAME ───────────────────────────────────────
function SnakeGame({onClose,cafeColor}) {
  const cvs=useRef(null);
  const state=useRef({snake:[{x:10,y:10}],dir:{x:1,y:0},food:{x:15,y:10},score:0,alive:true,speed:150});
  const timer=useRef(null);
  const [score,setScore]=useState(0);
  const [alive,setAlive]=useState(true);
  const [started,setStarted]=useState(false);
  const COLS=20,ROWS=20,SZ=18;

  const rand=()=>({x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)});

  const draw=useCallback(()=>{
    const c=cvs.current;if(!c)return;
    const ctx=c.getContext("2d");
    const s=state.current;
    const dark=document.documentElement.getAttribute("data-theme")==="dark";
    ctx.fillStyle=dark?"#1A1814":"#F5F2ED";ctx.fillRect(0,0,COLS*SZ,ROWS*SZ);
    ctx.fillStyle=dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)";
    for(let x=0;x<COLS;x++)for(let y=0;y<ROWS;y++){if((x+y)%2===0)ctx.fillRect(x*SZ,y*SZ,SZ,SZ);}
    // food
    ctx.fillStyle="#FF5C35";ctx.beginPath();ctx.arc(s.food.x*SZ+SZ/2,s.food.y*SZ+SZ/2,SZ/2-2,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="11px sans-serif";ctx.textAlign="center";ctx.fillText("☕",s.food.x*SZ+SZ/2,s.food.y*SZ+SZ/2+4);
    // snake
    s.snake.forEach((seg,i)=>{
      const col=i===0?cafeColor||"#FF5C35":"rgba(255,92,53,0.6)";
      ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(seg.x*SZ+1,seg.y*SZ+1,SZ-2,SZ-2,4);ctx.fill();
    });
    if(!s.alive){
      ctx.fillStyle="rgba(0,0,0,0.6)";ctx.fillRect(0,0,COLS*SZ,ROWS*SZ);
      ctx.fillStyle="#fff";ctx.font="bold 22px Syne,sans-serif";ctx.textAlign="center";
      ctx.fillText("Game Over!",COLS*SZ/2,ROWS*SZ/2-10);
      ctx.font="14px sans-serif";ctx.fillText(`Score: ${s.score}`,COLS*SZ/2,ROWS*SZ/2+16);
      ctx.fillText("Tap to restart",COLS*SZ/2,ROWS*SZ/2+38);
    }
  },[cafeColor]);

  const tick=useCallback(()=>{
    const s=state.current;if(!s.alive)return;
    const head={x:(s.snake[0].x+s.dir.x+COLS)%COLS,y:(s.snake[0].y+s.dir.y+ROWS)%ROWS};
    if(s.snake.some(seg=>seg.x===head.x&&seg.y===head.y)){s.alive=false;setAlive(false);draw();return;}
    s.snake.unshift(head);
    if(head.x===s.food.x&&head.y===s.food.y){s.score++;s.food=rand();setScore(s.score);}
    else s.snake.pop();
    draw();
  },[draw]);

  const start=useCallback(()=>{
    const s=state.current;s.snake=[{x:10,y:10}];s.dir={x:1,y:0};s.food=rand();s.score=0;s.alive=true;
    setScore(0);setAlive(true);setStarted(true);
    clearInterval(timer.current);timer.current=setInterval(tick,150);
  },[tick]);

  useEffect(()=>{
    const h=(e)=>{
      const s=state.current;if(!s.alive)return;
      if(e.key==="ArrowUp"&&s.dir.y!==1)s.dir={x:0,y:-1};
      if(e.key==="ArrowDown"&&s.dir.y!==-1)s.dir={x:0,y:1};
      if(e.key==="ArrowLeft"&&s.dir.x!==1)s.dir={x:-1,y:0};
      if(e.key==="ArrowRight"&&s.dir.x!==-1)s.dir={x:1,y:0};
      e.preventDefault();
    };
    window.addEventListener("keydown",h);
    draw();
    return()=>{window.removeEventListener("keydown",h);clearInterval(timer.current);};
  },[draw]);

  const handleCanvas=()=>{if(!alive||!started)start();};

  // Mobile controls
  const setDir=(d)=>{
    const s=state.current;
    if(d==="up"&&s.dir.y!==1)s.dir={x:0,y:-1};
    if(d==="down"&&s.dir.y!==-1)s.dir={x:0,y:1};
    if(d==="left"&&s.dir.x!==1)s.dir={x:-1,y:0};
    if(d==="right"&&s.dir.x!==-1)s.dir={x:1,y:0};
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center",marginBottom:4}}>
        <Tag color="brand">Score: {score}</Tag>
        <Tag color="blue">Use Arrow Keys</Tag>
      </div>
      <canvas ref={cvs} width={COLS*SZ} height={ROWS*SZ} onClick={handleCanvas}
        style={{borderRadius:12,cursor:"pointer",border:"2px solid var(--border2)",maxWidth:"100%"}} />
      {!started&&<Btn onClick={start} variant="primary" size="lg">▶ Start Game</Btn>}
      {!alive&&started&&<Btn onClick={start} variant="primary">↺ Play Again</Btn>}
      {/* Mobile D-pad */}
      {/* <div style={{display:"grid",gridTemplateColumns:"repeat(3,44px)",gridTemplateRows:"repeat(3,44px)",gap:4}}>
        {[["","↑",""],["←","","→"],["","↓",""]].map((row,ri)=>row.map((cell,ci)=>(
          <button key={`${ri}${ci}`} onClick={()=>cell&&setDir({↑:"up",↓:"down",←:"left",→:"right"}[cell])}
            style={{borderRadius:8,border:"1px solid var(--border2)",background:cell?"var(--bg3)":"transparent",cursor:cell?"pointer":"default",fontSize:16,fontWeight:700,color:"var(--text2)",display:"flex",alignItems:"center",justifyContent:"center"}}>{cell}</button>
        )))}
      </div> */}
    </div>
  );
}

// ── MEMORY GAME ───────────────────────────────────────
const MEM_EMOJIS = ["☕","🍰","🫖","🧁","🥐","🍫","🥛","🫙"];
function MemoryGame({cafeColor}) {
  const mkCards=()=>[...MEM_EMOJIS,...MEM_EMOJIS].map((e,i)=>({id:i,emoji:e,flipped:false,matched:false})).sort(()=>Math.random()-.5);
  const [cards,setCards]=useState(mkCards);
  const [sel,setSel]=useState([]);
  const [moves,setMoves]=useState(0);
  const [won,setWon]=useState(false);
  const checking=useRef(false);

  const flip=(id)=>{
    if(checking.current)return;
    const c=cards.find(c=>c.id===id);
    if(c.flipped||c.matched||sel.length===2)return;
    const ns=sel.concat(id);
    setCards(p=>p.map(c=>c.id===id?{...c,flipped:true}:c));
    setSel(ns);
    if(ns.length===2){
      setMoves(m=>m+1);
      checking.current=true;
      const [a,b]=ns.map(id=>cards.find(c=>c.id===id));
      setTimeout(()=>{
        if(a.emoji===b.emoji){
          setCards(p=>p.map(c=>ns.includes(c.id)?{...c,matched:true}:c));
          setCards(p=>{const nw=p.every(c=>c.matched||ns.includes(c.id));if(nw)setWon(true);return p.map(c=>ns.includes(c.id)?{...c,matched:true}:c);});
        } else setCards(p=>p.map(c=>ns.includes(c.id)?{...c,flipped:false}:c));
        setSel([]);checking.current=false;
      },700);
    }
  };

  const reset=()=>{setCards(mkCards());setSel([]);setMoves(0);setWon(false);};

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{display:"flex",gap:12,marginBottom:2}}>
        <Tag color="brand">Moves: {moves}</Tag>
        <Tag color="green">Matched: {cards.filter(c=>c.matched).length/2}/{MEM_EMOJIS.length}</Tag>
      </div>
      {won&&<div style={{background:"rgba(0,200,150,0.1)",border:"1px solid #00C896",borderRadius:12,padding:"10px 20px",color:"#00C896",fontWeight:700}}>🎉 You won in {moves} moves!</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,maxWidth:280}}>
        {cards.map(c=>(
          <div key={c.id} onClick={()=>flip(c.id)} style={{width:60,height:60,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`2px solid ${c.matched?"rgba(0,200,150,0.4)":"var(--border2)"}`,
            background:c.flipped||c.matched?c.matched?"rgba(0,200,150,0.1)":cafeColor+"22":"var(--bg3)",
            transition:"all .3s",transform:c.flipped||c.matched?"scale(1.04)":"scale(1)"}}>
            {c.flipped||c.matched?c.emoji:"?"}
          </div>
        ))}
      </div>
      <Btn onClick={reset} variant="ghost" size="sm">↺ Reset</Btn>
    </div>
  );
}

// ── FLAPPY GAME ───────────────────────────────────────
function FlappyGame({cafeColor}) {
  const cvs=useRef(null);
  const state=useRef({y:150,vy:0,pipes:[],score:0,alive:false,frame:0});
  const raf=useRef(null);
  const [score,setScore]=useState(0);
  const [alive,setAlive]=useState(false);
  const [best,setBest]=useState(0);
  const W=280,H=300,GW=50,GAP=90,BIRD=18,GRAV=0.45,JUMP=-7,PSPEED=2.5;

  const jump=()=>{
    const s=state.current;
    if(!s.alive){s.alive=true;s.y=150;s.vy=0;s.pipes=[];s.score=0;s.frame=0;setScore(0);setAlive(true);}
    s.vy=JUMP;
  };

  const draw=useCallback(()=>{
    const c=cvs.current;if(!c)return;
    const ctx=c.getContext("2d");
    const s=state.current;
    const dark=document.documentElement.getAttribute("data-theme")==="dark";
    ctx.fillStyle=dark?"#1A1814":"#E8F4FD";ctx.fillRect(0,0,W,H);
    // ground
    ctx.fillStyle=dark?"#2A2420":"#8B6914";ctx.fillRect(0,H-25,W,25);
    ctx.fillStyle=dark?"#3A2E1A":"#A87C28";ctx.fillRect(0,H-28,W,4);
    // pipes
    s.pipes.forEach(p=>{
      ctx.fillStyle=cafeColor||"#FF5C35";
      ctx.fillRect(p.x,0,GW,p.top);ctx.fillRect(p.x,p.top+GAP,GW,H-p.top-GAP-25);
      ctx.fillStyle=dark?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.3)";
      ctx.fillRect(p.x+2,0,6,p.top);ctx.fillRect(p.x+2,p.top+GAP,6,H-p.top-GAP-25);
    });
    // bird
    ctx.fillStyle="#F5C842";ctx.beginPath();ctx.arc(70,s.y,BIRD/2,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="13px sans-serif";ctx.textAlign="center";ctx.fillText("☕",70,s.y+5);
    // score
    ctx.fillStyle=dark?"rgba(255,255,255,0.9)":"rgba(0,0,0,0.7)";ctx.font="bold 18px Syne,sans-serif";ctx.textAlign="center";ctx.fillText(s.score,W/2,32);
    if(!s.alive&&s.frame===0){
      ctx.fillStyle=dark?"rgba(0,0,0,0.7)":"rgba(255,255,255,0.85)";ctx.fillRect(W/2-80,H/2-50,160,100);ctx.fillStyle=dark?"#fff":"#333";
      ctx.font="bold 18px Syne,sans-serif";ctx.fillText("Tap to Play!",W/2,H/2-20);ctx.font="13px sans-serif";ctx.fillText(`Best: ${best}`,W/2,H/2+5);ctx.fillText("Jump: Tap / Space",W/2,H/2+26);
    }
  },[cafeColor,best]);

  const loop=useCallback(()=>{
    const s=state.current;s.frame++;
    s.y+=s.vy;s.vy+=GRAV;
    if(s.frame%70===0)s.pipes.push({x:W+10,top:60+Math.random()*(H-GAP-120)});
    s.pipes=s.pipes.filter(p=>p.x>-GW);
    s.pipes.forEach(p=>{p.x-=PSPEED;if(p.x+GW===68){s.score++;setScore(s.score);}});
    // collide
    if(s.y+BIRD/2>H-25||s.y-BIRD/2<0){s.alive=false;setAlive(false);setBest(b=>Math.max(b,s.score));draw();return;}
    for(const p of s.pipes){
      if(70+BIRD/2>p.x&&70-BIRD/2<p.x+GW&&(s.y-BIRD/2<p.top||s.y+BIRD/2>p.top+GAP)){
        s.alive=false;setAlive(false);setBest(b=>Math.max(b,s.score));draw();return;
      }
    }
    draw();
    raf.current=requestAnimationFrame(loop);
  },[draw]);

  useEffect(()=>{
    draw();
    const h=(e)=>{if(e.code==="Space"){e.preventDefault();jump();}};
    window.addEventListener("keydown",h);
    return()=>{window.removeEventListener("keydown",h);cancelAnimationFrame(raf.current);};
  },[draw]);

  useEffect(()=>{if(alive){cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(loop);}},[alive,loop]);

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
      <div style={{display:"flex",gap:10}}><Tag color="brand">Score: {score}</Tag><Tag color="gold">Best: {best}</Tag></div>
      <canvas ref={cvs} width={W} height={H} onClick={jump} style={{borderRadius:12,cursor:"pointer",border:"2px solid var(--border2)",maxWidth:"100%"}} />
      <p style={{fontSize:11,color:"var(--text4)"}}>Tap canvas or press Space to jump</p>
    </div>
  );
}

// ── WORD SCRAMBLE ─────────────────────────────────────
const WORDS=[{w:"espresso",h:"Italian for 'pressed out'"},{"w":"cappuccino","h":"Named after Capuchin friars"},{"w":"barista","h":"Coffee shop professional"},{"w":"cortado","h":"Spanish for 'cut'"},{"w":"macchiato","h":"Italian for 'stained'"},{"w":"latte","h":"Italian for 'milk'"},{"w":"roaster","h":"Who prepares raw beans"},{"w":"arabica","h":"Most popular bean species"}];
function WordScramble({cafeColor}) {
  const [idx,setIdx]=useState(0);
  const [scrambled,setScrambled]=useState("");
  const [input,setInput]=useState("");
  const [result,setResult]=useState(null);
  const [score,setScore]=useState(0);

  const scramble=(word)=>[...word].sort(()=>Math.random()-.5).join("");

  useEffect(()=>{setScrambled(scramble(WORDS[idx].w));setInput("");setResult(null);},[idx]);

  const check=()=>{
    if(input.toLowerCase()===WORDS[idx].w){setResult("correct");setScore(s=>s+1);setTimeout(()=>setIdx(i=>(i+1)%WORDS.length),1200);}
    else setResult("wrong");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"8px 0"}}>
      <div style={{display:"flex",gap:10}}><Tag color="brand">Score: {score}</Tag><Tag color="blue">Word {idx+1}/{WORDS.length}</Tag></div>
      <div style={{background:"var(--bg3)",borderRadius:14,padding:"18px 28px",textAlign:"center"}}>
        <div style={{fontFamily:"var(--fm)",fontSize:28,fontWeight:700,letterSpacing:6,color:cafeColor||"var(--brand)",marginBottom:6}}>{scrambled.toUpperCase()}</div>
        <div style={{fontSize:12,color:"var(--text4)"}}>Hint: {WORDS[idx].h}</div>
      </div>
      <div style={{display:"flex",gap:8,width:"100%",maxWidth:280}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
          placeholder="Type your answer..." style={{flex:1,padding:"10px 13px",borderRadius:10,border:`2px solid ${result==="correct"?"#00C896":result==="wrong"?"#FF5C35":"var(--border2)"}`,fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none"}} />
        <Btn onClick={check} variant="primary" size="sm">Go</Btn>
      </div>
      {result==="correct"&&<Tag color="green">✓ Correct! Next word...</Tag>}
      {result==="wrong"&&<Tag color="red">✕ Try again!</Tag>}
      <Btn onClick={()=>setIdx(i=>(i+1)%WORDS.length)} variant="ghost" size="sm">Skip →</Btn>
    </div>
  );
}

// ── GAME HUB ─────────────────────────────────────────
function GameHub({cafe}) {
  const [active,setActive]=useState(null);

  const games=cafe.games.map(id=>GAMES_INFO[id]).filter(Boolean);

  if(active) {
    const g=active;
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <Btn onClick={()=>setActive(null)} variant="ghost" size="sm">← Back</Btn>
          <div>
            <h3 style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:700}}>{g.icon} {g.name}</h3>
            <p style={{fontSize:12,color:"var(--text3)"}}>{g.desc}</p>
          </div>
        </div>
        {g.id==="snake"&&<SnakeGame cafeColor={cafe.color} onClose={()=>setActive(null)} />}
        {g.id==="memory"&&<MemoryGame cafeColor={cafe.color} />}
        {g.id==="flappy"&&<FlappyGame cafeColor={cafe.color} />}
        {g.id==="wordscramble"&&<WordScramble cafeColor={cafe.color} />}
      </div>
    );
  }

  return (
    <div>
      <h3 style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:700,marginBottom:6}}>🎮 Café Games</h3>
      <p style={{fontSize:13,color:"var(--text3)",marginBottom:16}}>Play while you wait for your order!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
        {games.map(g=>(
          <div key={g.id} onClick={()=>setActive(g)} style={{background:"var(--bg3)",borderRadius:14,padding:"14px 10px",textAlign:"center",cursor:"pointer",border:"1px solid var(--border)",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=cafe.color+"22";e.currentTarget.style.borderColor=cafe.color;}}
            onMouseLeave={e=>{e.currentTarget.style.background="var(--bg3)";e.currentTarget.style.borderColor="var(--border)";}}>
            <div style={{fontSize:28,marginBottom:6}}>{g.icon}</div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{g.name}</div>
            <div style={{fontSize:11,color:"var(--text4)"}}>{g.plays} plays</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PUBLIC PAGES
// ═══════════════════════════════════════════════════════

// ── PUBLIC NAV ────────────────────────────────────────
function PublicNav({nav,path}) {
  const {count}=useCart();
  const {user,logout}=useAuth();
  const {sid,exit}=useScan();
  const [mOpen,setMOpen]=useState(false);

  return (
    <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(var(--bg-rgb,245,242,237),0.92)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--border)"}}>
      <div style={{maxWidth:1300,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* Logo */}
        <a href="#/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
          <div style={{width:34,height:34,borderRadius:9,background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>☕</div>
          <span style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:800,color:"var(--text)"}}>CaféHub</span>
        </a>

        {/* Scanned session banner */}
        {sid&&<div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,92,53,0.1)",border:"1px solid rgba(255,92,53,0.3)",borderRadius:99,padding:"5px 12px",fontSize:12}}>
          <span style={{color:"var(--brand)",fontWeight:700}}>🔒 Locked to: {CAFES.find(c=>c.id===sid)?.name}</span>
          <button onClick={()=>{exit();nav("/cafes");}} style={{border:"none",background:"var(--brand)",color:"#fff",borderRadius:99,padding:"2px 8px",fontSize:11,cursor:"pointer",fontWeight:700}}>Exit</button>
        </div>}

        {/* Desktop Nav */}
        <div className="hm" style={{display:"flex",alignItems:"center",gap:8}}>
          {!sid&&<a href="#/cafes" style={{fontSize:13,fontWeight:500,color:"var(--text3)",padding:"6px 12px",borderRadius:8}}>Browse</a>}
          <ThemeToggle />
          <button onClick={()=>nav("/cart")} style={{position:"relative",background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:10,padding:"7px 10px",cursor:"pointer",display:"flex",alignItems:"center"}}>
            <svg width="17" height="17" fill="none" stroke="var(--text2)" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count>0&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--brand)",color:"#fff",fontSize:9,fontWeight:800,borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{count}</span>}
          </button>
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11}}>{user.avatar}</div>
              <Btn onClick={()=>{logout();nav("/");}} variant="ghost" size="sm">Out</Btn>
            </div>
          ):(
            <Btn onClick={()=>nav("/login")} variant="primary" size="sm">Login</Btn>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="hd" style={{display:"flex",alignItems:"center",gap:8}}>
          <ThemeToggle size={30} />
          <button onClick={()=>nav("/cart")} style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:6}}>
            <svg width="20" height="20" fill="none" stroke="var(--text)" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
            {count>0&&<span style={{position:"absolute",top:1,right:1,background:"var(--brand)",color:"#fff",fontSize:9,fontWeight:800,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{count}</span>}
          </button>
          <button onClick={()=>setMOpen(o=>!o)} style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:8,padding:"7px 9px",cursor:"pointer",fontSize:15}}>☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {mOpen&&<div className="hd sci" style={{background:"var(--card)",borderBottom:"1px solid var(--border)",padding:16,display:"flex",flexDirection:"column",gap:8}}>
        {!sid&&<a href="#/cafes" onClick={()=>setMOpen(false)} style={{padding:"10px 14px",borderRadius:10,background:"var(--bg3)",fontSize:14,fontWeight:500,color:"var(--text)"}}>☕ Browse Cafés</a>}
        {user?<Btn onClick={()=>{logout();nav("/");setMOpen(false);}} variant="secondary" full>Sign Out</Btn>:<Btn onClick={()=>{nav("/login");setMOpen(false);}} variant="primary" full>Login</Btn>}
      </div>}
    </nav>
  );
}

// ── HOME PAGE ─────────────────────────────────────────
function HomePage({nav}) {
  const [loading,setLoading]=useState(true);
  const featured=CAFES.filter(c=>c.featured);
  useEffect(()=>{setTimeout(()=>setLoading(false),900);},[]);
  const CATS=["☕ Coffee Shop","🍵 Tea House","🥗 Brunch","🌿 Eco Café","🍰 Pastry Bar","✨ Luxury"];

  return (
    <div>
      {/* Hero */}
      <section style={{position:"relative",minHeight:580,overflow:"hidden",display:"flex",alignItems:"center"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&q=60)",backgroundSize:"cover",backgroundPosition:"center"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(13,12,10,0.9) 0%,rgba(13,12,10,0.6) 60%,rgba(13,12,10,0.3) 100%)"}} />
        {/* Floating blobs */}
        <div style={{position:"absolute",top:"20%",right:"15%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,53,0.2) 0%,transparent 70%)",animation:"float 6s ease-in-out infinite",pointerEvents:"none"}} />
        <div style={{maxWidth:1300,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1,width:"100%"}}>
          <Tag color="gold" size="md">🌟 10+ Premium Cafés</Tag>
          <h1 className="fu" style={{fontFamily:"var(--fd)",fontSize:"clamp(38px,6vw,76px)",fontWeight:800,color:"#F0EAE0",lineHeight:1.08,marginTop:14,maxWidth:680}}>
            Discover your city's<br/><span style={{color:"var(--brand)"}}>finest café</span> moments
          </h1>
          <p className="fu2" style={{fontSize:"clamp(15px,2vw,18px)",color:"rgba(240,234,224,0.65)",marginTop:18,maxWidth:460,lineHeight:1.65}}>Browse artisan coffee, curated menus & exclusive offers from top cafés. Scan a QR to get the full experience.</p>
          <div className="fu3" style={{display:"flex",gap:10,marginTop:32,flexWrap:"wrap"}}>
            <Btn onClick={()=>nav("/cafes")} variant="primary" size="xl">Explore Cafés →</Btn>
            <Btn onClick={()=>nav("/cafes")} size="xl" style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)"}}>View Offers 🎉</Btn>
          </div>
          {/* Stats */}
          <div className="fu4" style={{display:"flex",gap:16,marginTop:44,flexWrap:"wrap"}}>
            {[{n:"10+",l:"Cafés"},{n:"50K+",l:"Customers"},{n:"200+",l:"Menu Items"},{n:"40+",l:"Offers"}].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,0.07)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"14px 20px",textAlign:"center"}}>
                <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:800,color:"#fff"}}>{s.n}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling marquee */}
      <div style={{background:"var(--brand)",padding:"12px 0",overflow:"hidden"}}>
        <div style={{display:"flex",gap:40,animation:"marquee 20s linear infinite",width:"max-content"}}>
          {[...Array(2)].map((_,k)=>(
            <div key={k} style={{display:"flex",gap:40}}>
              {["Specialty Coffee ✦","Premium Brews ✦","Fresh Daily ✦","Artisan Crafted ✦","QR Ordering ✦","10+ Cafés ✦","Vegan Options ✦","Live Events ✦"].map(t=>(
                <span key={t} style={{color:"#fff",fontSize:13,fontWeight:600,whiteSpace:"nowrap"}}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section style={{maxWidth:1300,margin:"0 auto",padding:"60px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <div>
            <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,32px)",fontWeight:800}}>Browse by Type</h2>
            <p style={{color:"var(--text3)",fontSize:13,marginTop:4}}>Find your perfect café experience</p>
          </div>
        </div>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none"}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>nav("/cafes")} style={{padding:"12px 18px",borderRadius:12,border:"1px solid var(--border2)",background:"var(--card)",color:"var(--text2)",cursor:"pointer",fontSize:13,fontWeight:500,whiteSpace:"nowrap",fontFamily:"var(--fb)",transition:"all .2s",flexShrink:0}}
              onMouseEnter={e=>{e.currentTarget.style.background="var(--brand)";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="var(--brand)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--card)";e.currentTarget.style.color="var(--text2)";e.currentTarget.style.borderColor="var(--border2)";}}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{maxWidth:1300,margin:"0 auto",padding:"52px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <div>
            <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,32px)",fontWeight:800}}>Featured Cafés</h2>
            <p style={{color:"var(--text3)",fontSize:13,marginTop:4}}>Hand-picked gems in your city</p>
          </div>
          <a href="#/cafes" style={{color:"var(--brand)",fontSize:13,fontWeight:700,textDecoration:"none"}}>View all →</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
          {loading?Array(3).fill(0).map((_,i)=>(
            <div key={i} style={{borderRadius:20,overflow:"hidden",background:"var(--card)",border:"1px solid var(--border)"}}>
              <Sk h={200} r={0} /><div style={{padding:18}}><Sk h={18} w="60%" /><div style={{marginTop:8}} /><Sk h={13} /></div>
            </div>
          )):featured.map(c=><CafeCard key={c.id} cafe={c} nav={nav} />)}
        </div>
      </section>

      {/* Offer Banner */}
      <section style={{margin:"0 24px 60px",maxWidth:1300,marginLeft:"auto",marginRight:"auto"}}>
        <div style={{background:"linear-gradient(135deg,var(--brand) 0%,#C73B1F 50%,#FF8C42 100%)",borderRadius:24,padding:"clamp(32px,5vw,56px)",position:"relative",overflow:"hidden",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
          <div style={{position:"absolute",right:-40,top:-40,width:240,height:240,borderRadius:"50%",background:"rgba(255,255,255,0.08)"}} />
          <div>
            <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,36px)",fontWeight:800,color:"#fff"}}>🎉 Exclusive Offers Today</h2>
            <p style={{color:"rgba(255,255,255,0.75)",marginTop:8,fontSize:15}}>Save up to 40% at your favourite cafés</p>
          </div>
          <Btn onClick={()=>nav("/cafes")} size="lg" style={{background:"#fff",color:"var(--brand)",border:"none",fontWeight:800}}>Claim Now</Btn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",padding:"36px 24px",textAlign:"center"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:800,marginBottom:4}}>☕ CaféHub</div>
        <p style={{color:"var(--text4)",fontSize:12}}>© 2025 CaféHub. All rights reserved.</p>
        <div style={{marginTop:14,display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
          {[{l:"Admin Panel",p:"/admin/dashboard"},{l:"Owner Panel",p:"/owner/dashboard"},{l:"Login",p:"/login"}].map(x=>(
            <a key={x.l} href={`#${x.p}`} style={{color:"var(--text4)",fontSize:12,textDecoration:"none"}}>{x.l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── CAFE CARD ─────────────────────────────────────────
function CafeCard({cafe,nav}) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={()=>nav(`/cafe/${cafe.id}`)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderRadius:20,overflow:"hidden",background:"var(--card)",border:"1px solid var(--border)",cursor:"pointer",transition:"all .25s",transform:hov?"translateY(-5px)":"translateY(0)",boxShadow:hov?"var(--sh3)":"var(--sh1)"}}>
      <div style={{position:"relative",height:190,overflow:"hidden"}}>
        <img src={cafe.image} alt={cafe.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s",transform:hov?"scale(1.06)":"scale(1)"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)"}} />
        <div style={{position:"absolute",top:10,left:10}}>
          <span style={{background:cafe.isOpen?"#00C896":"#78726A",color:"#fff",fontSize:10,fontWeight:800,padding:"4px 10px",borderRadius:99,letterSpacing:.5}}>
            {cafe.isOpen?"● OPEN":"● CLOSED"}
          </span>
        </div>
        <div style={{position:"absolute",top:10,right:10}}>
          <Tag color="default" size="xs"><span style={{fontSize:10,fontWeight:700}}>{cafe.priceRange}</span></Tag>
        </div>
        {cafe.featured&&<div style={{position:"absolute",bottom:10,left:10}}><Tag color="gold" size="xs">⭐ Featured</Tag></div>}
        {/* Game icon */}
        {cafe.games?.length>0&&<div style={{position:"absolute",bottom:10,right:10,background:"rgba(0,0,0,0.5)",borderRadius:8,padding:"4px 8px",fontSize:11,color:"#fff",fontWeight:600}}>🎮 {cafe.games.length} Games</div>}
      </div>
      <div style={{padding:"16px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:8}}>
          <div>
            <h3 style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:700,color:"var(--text)"}}>{cafe.name}</h3>
            <p style={{fontSize:12,color:"var(--text3)",marginTop:1}}>{cafe.cuisine}</p>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end"}}>
              <Stars r={cafe.rating} size={11} />
              <span style={{fontWeight:700,fontSize:12}}>{cafe.rating}</span>
            </div>
            <span style={{fontSize:10,color:"var(--text4)"}}>({cafe.reviews.toLocaleString()})</span>
          </div>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
          {cafe.tags.slice(0,2).map(t=><Tag key={t} color="default" size="xs">{t}</Tag>)}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:"var(--text4)"}}>
          <span>📍 {cafe.city}</span>
          <span>🕐 {cafe.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}

// ── ALL CAFES PAGE ────────────────────────────────────
function CafesPage({nav}) {
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("All");
  const [loading,setLoading]=useState(true);
  const cats=["All","Coffee Shop","Tea House","Espresso Bar","Breakfast Café","Eco Café","Luxury Café","Health Café","Artisan Café","Coffee Bar"];
  const filtered=CAFES.filter(c=>(c.name+c.city).toLowerCase().includes(search.toLowerCase())&&(filter==="All"||c.category===filter));
  useEffect(()=>{setTimeout(()=>setLoading(false),500);},[]);

  return (
    <div style={{maxWidth:1300,margin:"0 auto",padding:"36px 20px"}}>
      <div className="fu" style={{marginBottom:28}}>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(26px,4vw,40px)",fontWeight:800}}>All Cafés</h1>
        <p style={{color:"var(--text3)",marginTop:4,fontSize:13}}>{CAFES.length} cafés available on CaféHub</p>
      </div>

      {/* Search */}
      <div className="fu2" style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:240}}>
          <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"var(--text4)"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cafés, cities..."
            style={{width:"100%",padding:"11px 13px 11px 36px",borderRadius:12,border:"1px solid var(--border2)",fontSize:13,background:"var(--card)",color:"var(--text)",outline:"none",fontFamily:"var(--fb)"}} />
        </div>
      </div>

      {/* Filters */}
      <div className="fu3" style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none",marginBottom:28}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:"8px 14px",borderRadius:99,border:"none",background:filter===c?"var(--brand)":"var(--bg3)",color:filter===c?"#fff":"var(--text3)",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",transition:"all .18s",fontFamily:"var(--fb)",flexShrink:0}}>
            {c}
          </button>
        ))}
      </div>

      {loading?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {Array(6).fill(0).map((_,i)=><div key={i} style={{borderRadius:20,overflow:"hidden",background:"var(--card)",border:"1px solid var(--border)"}}><Sk h={190} r={0} /><div style={{padding:18}}><Sk h={18} w="55%" /><div style={{marginTop:8}} /><Sk h={13} /></div></div>)}
        </div>
      ):filtered.length===0?(
        <div style={{textAlign:"center",padding:"80px 0",color:"var(--text3)"}}>
          <div style={{fontSize:56}}>☕</div>
          <h3 style={{fontFamily:"var(--fd)",fontSize:22,marginTop:14}}>No cafés found</h3>
          <p style={{marginTop:6,fontSize:13}}>Try adjusting your filters</p>
          <Btn onClick={()=>{setSearch("");setFilter("All");}} style={{marginTop:18}} size="sm" variant="secondary">Clear Filters</Btn>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {filtered.map(c=><CafeCard key={c.id} cafe={c} nav={nav} />)}
        </div>
      )}
    </div>
  );
}

// ── CAFE DETAIL PAGE ──────────────────────────────────
function CafeDetailPage({cafeId,nav}) {
  const cafe=CAFES.find(c=>c.id===cafeId);
  const {sid}=useScan();
  const [gameOpen,setGameOpen]=useState(false);
  if(!cafe)return <Page404 nav={nav} />;
  if(sid&&sid!==cafeId)return <UnauthCafe sid={sid} nav={nav} />;
  const menu=(MENU_ITEMS[cafeId]||[]).filter(i=>i.popular);
  const offers=(OFFERS[cafeId]||[]).slice(0,2);

  return (
    <div>
      {/* Banner */}
      <div style={{position:"relative",height:"clamp(260px,35vw,380px)",overflow:"hidden"}}>
        <img src={cafe.banner} alt={cafe.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 55%,transparent 100%)"}} />
        <Btn onClick={()=>nav(sid?`/cafe/${sid}`:"/cafes")} size="sm" style={{position:"absolute",top:18,left:18,background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff"}}>← Back</Btn>
        <div style={{position:"absolute",bottom:22,left:22,right:22}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:16,flexWrap:"wrap"}}>
            <img src={cafe.logo} alt={cafe.name} style={{width:72,height:72,borderRadius:14,objectFit:"cover",border:"3px solid rgba(255,255,255,0.8)",flexShrink:0}} />
            <div style={{flex:1,minWidth:0}}>
              <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,color:"#fff",lineHeight:1.1}}>{cafe.name}</h1>
              <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,marginTop:2}}>{cafe.cuisine}</p>
            </div>
            <div style={{flexShrink:0}}>
              <span style={{background:cafe.isOpen?"#00C896":"#666",color:"#fff",padding:"6px 14px",borderRadius:99,fontSize:12,fontWeight:800}}>
                {cafe.isOpen?"● OPEN":"● CLOSED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 300px",gap:24}}>
          {/* Main */}
          <div>
            {/* Info card */}
            <div style={{background:"var(--card)",borderRadius:20,padding:"22px 24px",border:"1px solid var(--border)",marginBottom:22,boxShadow:"var(--sh1)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:16,flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <Stars r={cafe.rating} size={15} />
                    <span style={{fontWeight:800,fontSize:15}}>{cafe.rating}</span>
                    <span style={{color:"var(--text4)",fontSize:13}}>({cafe.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 20px"}}>
                    {[["📍",cafe.address],["📞",cafe.phone],["✉️",cafe.email],["🕐",`${cafe.openTime}–${cafe.closeTime}`]].map(([icon,val])=>(
                      <span key={val} style={{fontSize:12,color:"var(--text3)",display:"flex",alignItems:"center",gap:4}}><span>{icon}</span>{val}</span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,maxWidth:180}}>
                  {cafe.tags.map(t=><Tag key={t} color="default" size="sm">{t}</Tag>)}
                  <Tag color="brand" size="sm">{cafe.priceRange}</Tag>
                </div>
              </div>
              <p style={{color:"var(--text2)",fontSize:13,lineHeight:1.7}}>{cafe.desc}</p>
            </div>

            {/* Offers strip */}
            {offers.length>0&&(
              <div style={{marginBottom:22}}>
                <h3 style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:700,marginBottom:12}}>🎉 Active Offers</h3>
                <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:4}}>
                  {offers.map(o=>(
                    <div key={o.id} style={{minWidth:240,background:`linear-gradient(135deg,${cafe.color} 0%,${cafe.color}BB 100%)`,borderRadius:16,padding:"18px 20px",color:"#fff",flexShrink:0}}>
                      <div style={{fontSize:20,fontWeight:900,marginBottom:2}}>{o.discount}</div>
                      <div style={{fontWeight:700,marginBottom:4,fontSize:14}}>{o.title}</div>
                      <div style={{opacity:.8,fontSize:12,marginBottom:10}}>{o.desc}</div>
                      <div style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 10px",display:"inline-block",fontFamily:"var(--fm)",fontSize:12,fontWeight:700}}>{o.code}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Btn onClick={()=>nav(`/cafe/${cafeId}/menu`)} variant="dark" size="lg" style={{flex:"1 1 160px"}}>📋 Full Menu</Btn>
              <Btn onClick={()=>nav(`/cafe/${cafeId}/offers`)} variant="primary" size="lg" style={{flex:"1 1 160px"}}>🎉 All Offers</Btn>
              <Btn onClick={()=>setGameOpen(true)} size="lg" style={{flex:"1 1 160px",background:`${cafe.color}22`,color:cafe.color,border:`1px solid ${cafe.color}44`}}>🎮 Play Games</Btn>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* QR */}
            <div style={{background:"var(--card)",borderRadius:18,padding:20,border:"1px solid var(--border)",textAlign:"center",boxShadow:"var(--sh1)"}}>
              <p style={{fontSize:12,color:"var(--text4)",marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Scan QR to Visit</p>
              <div style={{background:"var(--bg3)",borderRadius:12,padding:10,display:"inline-block"}}>
                <QRCode cafeId={cafeId} size={120} />
              </div>
              <p style={{fontSize:11,color:"var(--text4)",marginTop:8}}>{cafe.id}</p>
            </div>
            {/* Popular items */}
            <div style={{background:"var(--card)",borderRadius:18,padding:18,border:"1px solid var(--border)",boxShadow:"var(--sh1)"}}>
              <h4 style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:700,marginBottom:14}}>Popular Now</h4>
              {menu.slice(0,3).map(item=>(
                <div key={item.id} style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
                  <img src={item.image} alt={item.name} style={{width:48,height:48,borderRadius:10,objectFit:"cover",flexShrink:0}} />
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                    <div style={{fontWeight:700,color:"var(--brand)",fontSize:13,marginTop:1}}>${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <Btn onClick={()=>nav(`/cafe/${cafeId}/menu`)} variant="primary" full size="sm">View Full Menu →</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Games Modal */}
      <Modal open={gameOpen} onClose={()=>setGameOpen(false)} title={`🎮 ${cafe.name} Games`} w={400}>
        <GameHub cafe={cafe} />
      </Modal>
    </div>
  );
}

// ── MENU PAGE ─────────────────────────────────────────
function MenuPage({cafeId,nav}) {
  const cafe=CAFES.find(c=>c.id===cafeId);
  const items=MENU_ITEMS[cafeId]||[];
  const {add}=useCart();
  const toast=useToast();
  const {sid}=useScan();
  const [cat,setCat]=useState("All");
  const [qty,setQty]=useState({});
  if(sid&&sid!==cafeId)return<UnauthCafe sid={sid} nav={nav}/>;
  if(!cafe)return<Page404 nav={nav}/>;
  const cats=["All",...new Set(items.map(i=>i.category))];
  const filtered=cat==="All"?items:items.filter(i=>i.category===cat);

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 20px"}}>
      <Btn onClick={()=>nav(`/cafe/${cafeId}`)} variant="ghost" size="sm" style={{marginBottom:18}}>← {cafe.name}</Btn>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,34px)",fontWeight:800}}>Menu</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:2}}>{cafe.name} · {items.length} items</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{padding:"7px 14px",borderRadius:99,border:"none",background:cat===c?cafe.color:"var(--bg3)",color:cat===c?"#fff":"var(--text3)",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"var(--fb)",transition:"all .18s"}}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {filtered.map(item=>{
          const q=qty[item.id]||0;
          return (
            <div key={item.id} style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",display:"flex",overflow:"hidden",transition:"var(--sh1) .2s",boxShadow:"var(--sh1)"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--sh2)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="var(--sh1)"}>
              <img src={item.image} alt={item.name} style={{width:100,height:100,objectFit:"cover",flexShrink:0}} />
              <div style={{padding:"12px 14px",flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start"}}>
                    <div style={{fontWeight:700,fontSize:14,lineHeight:1.3}}>{item.name}</div>
                    {item.veg&&<span style={{fontSize:14,flexShrink:0,marginLeft:4}}>🌿</span>}
                  </div>
                  <div style={{color:"var(--text3)",fontSize:11,marginTop:3,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{item.desc}</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                  <span style={{fontWeight:800,fontSize:15}}>${item.price.toFixed(2)}</span>
                  {q===0?(
                    <Btn onClick={()=>{add(item);setQty(p=>({...p,[item.id]:1}));toast(`${item.name} added!`);}} size="sm" style={{background:cafe.color,color:"#fff",border:"none"}}>+ Add</Btn>
                  ):(
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={()=>{setQty(p=>({...p,[item.id]:p[item.id]-1}));}} style={{width:24,height:24,borderRadius:6,border:"1px solid var(--border2)",background:"var(--bg3)",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontWeight:700,fontSize:13,minWidth:16,textAlign:"center"}}>{q}</span>
                      <button onClick={()=>{add(item);setQty(p=>({...p,[item.id]:p[item.id]+1}));}} style={{width:24,height:24,borderRadius:6,border:"none",background:cafe.color,color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── OFFERS PAGE ───────────────────────────────────────
function OffersPage({cafeId,nav}) {
  const cafe=CAFES.find(c=>c.id===cafeId);
  const offers=OFFERS[cafeId]||[];
  const toast=useToast();
  const {sid}=useScan();
  if(sid&&sid!==cafeId)return<UnauthCafe sid={sid} nav={nav}/>;
  if(!cafe)return<Page404 nav={nav}/>;
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 20px"}}>
      <Btn onClick={()=>nav(`/cafe/${cafeId}`)} variant="ghost" size="sm" style={{marginBottom:18}}>← {cafe.name}</Btn>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,marginBottom:4}}>Offers & Deals</h1>
      <p style={{color:"var(--text3)",fontSize:13,marginBottom:28}}>{cafe.name} · {offers.length} active offers</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:22}}>
        {offers.map(o=>(
          <div key={o.id} style={{borderRadius:20,overflow:"hidden",background:"var(--card)",border:"1px solid var(--border)",boxShadow:"var(--sh1)"}}>
            <div style={{background:`linear-gradient(135deg,${cafe.color} 0%,${cafe.color}88 100%)`,padding:"22px 22px 18px",color:"#fff",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:-20,top:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.12)"}} />
              <div style={{fontSize:26,fontWeight:900,marginBottom:3}}>{o.discount}</div>
              <div style={{fontWeight:700,fontSize:16}}>{o.title}</div>
              <Tag color="default" size="xs" style={{marginTop:8,background:"rgba(255,255,255,0.2)",color:"#fff"}}>{o.type==="pct"?"Percentage":"Combo Deal"}</Tag>
            </div>
            <div style={{padding:20}}>
              <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.6,marginBottom:14}}>{o.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{background:"var(--bg3)",border:"1.5px dashed var(--border2)",borderRadius:8,padding:"7px 12px",fontFamily:"var(--fm)",fontSize:13,fontWeight:700,letterSpacing:1}}>{o.code}</div>
                <Btn onClick={()=>{navigator.clipboard?.writeText(o.code);toast("Copied!");}} size="sm" variant="dark">Copy</Btn>
              </div>
              <p style={{fontSize:11,color:"var(--text4)",marginTop:10}}>Valid till {o.validTill}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CART PAGE ─────────────────────────────────────────
function CartPage({nav}) {
  const {cart,upd,del,clear,total}=useCart();
  const toast=useToast();
  if(!cart.length)return(
    <div style={{textAlign:"center",padding:"100px 24px",maxWidth:480,margin:"0 auto"}}>
      <div style={{fontSize:60}}>🛒</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:26,marginTop:14}}>Cart is empty</h2>
      <p style={{color:"var(--text3)",marginTop:8,fontSize:14}}>Add items from a café menu</p>
      <Btn onClick={()=>nav("/cafes")} style={{marginTop:24}} size="lg" variant="primary">Browse Cafés</Btn>
    </div>
  );
  return (
    <div style={{maxWidth:660,margin:"40px auto",padding:"0 20px"}}>
      <h1 style={{fontFamily:"var(--fd)",fontSize:28,fontWeight:800,marginBottom:22}}>Your Cart</h1>
      <div style={{background:"var(--card)",borderRadius:20,border:"1px solid var(--border)",overflow:"hidden"}}>
        {cart.map(item=>(
          <div key={item.id} style={{display:"flex",gap:14,padding:"18px 22px",borderBottom:"1px solid var(--border)",alignItems:"center"}}>
            <img src={item.image} alt={item.name} style={{width:56,height:56,borderRadius:10,objectFit:"cover",flexShrink:0}} />
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:14}}>{item.name}</div>
              <div style={{color:"var(--brand)",fontWeight:700,fontSize:13,marginTop:2}}>${item.price.toFixed(2)}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <button onClick={()=>upd(item.id,item.qty-1)} style={{width:28,height:28,borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg3)",cursor:"pointer",fontSize:16,fontWeight:700}}>−</button>
              <span style={{fontWeight:700,minWidth:20,textAlign:"center",fontSize:14}}>{item.qty}</span>
              <button onClick={()=>upd(item.id,item.qty+1)} style={{width:28,height:28,borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg3)",cursor:"pointer",fontSize:16,fontWeight:700}}>+</button>
            </div>
            <div style={{fontWeight:800,minWidth:56,textAlign:"right"}}>${(item.price*item.qty).toFixed(2)}</div>
            <button onClick={()=>del(item.id)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--text4)",fontSize:16,padding:4}}>✕</button>
          </div>
        ))}
        <div style={{padding:"20px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,marginBottom:16}}>
            <span>Total</span><span style={{color:"var(--brand)"}}>${total.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={clear} variant="secondary" style={{flex:1}}>Clear</Btn>
            <Btn onClick={()=>{toast("Order placed! 🎉");clear();nav("/");}} variant="primary" style={{flex:2}}>Place Order →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────
function LoginPage({nav}) {
  const {login,user}=useAuth();
  const toast=useToast();
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  useEffect(()=>{if(user)nav(user.role==="owner"?"/owner/dashboard":"/admin/dashboard");},[user]);
  const go=async()=>{
    setLoading(true);setErr("");
    await new Promise(r=>setTimeout(r,700));
    const r=login(email,pw);setLoading(false);
    if(r.ok){toast("Welcome back! 👋");nav(r.user.role==="owner"?"/owner/dashboard":"/admin/dashboard");}
    else setErr("Invalid credentials — try the quick logins below");
  };
  const QUICK=[{l:"Admin",e:"admin@cafehub.com"},{l:"SubAdmin",e:"sam@cafehub.com"},{l:"Owner (James)",e:"james@roastedbean.com"},{l:"Owner (Priya)",e:"priya@brewbloom.com"}];
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20}}>
      <div style={{width:"100%",maxWidth:420,animation:"fadeUp .4s both"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:56,height:56,borderRadius:16,background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26}}>☕</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:28,fontWeight:800}}>CaféHub Login</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:5}}>Sign in to your account</p>
        </div>
        <div style={{background:"var(--card)",borderRadius:22,padding:28,border:"1px solid var(--border)",boxShadow:"var(--sh3)"}}>
          {/* Quick logins */}
          <div style={{marginBottom:20}}>
            <p style={{fontSize:11,color:"var(--text4)",marginBottom:7,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Quick Login</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {QUICK.map(q=>(
                <button key={q.l} onClick={()=>{setEmail(q.e);setPw("pass123");}} style={{padding:"5px 10px",borderRadius:7,border:"1px solid var(--border2)",background:"var(--bg3)",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"var(--fb)",color:"var(--text2)",transition:"all .15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="var(--brand)";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="var(--brand)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="var(--bg3)";e.currentTarget.style.color="var(--text2)";e.currentTarget.style.borderColor="var(--border2)";}}>
                  {q.l}
                </button>
              ))}
            </div>
          </div>
          <Inp label="Email" placeholder="you@example.com" value={email} onChange={setEmail} />
          <Inp label="Password" placeholder="pass123" value={pw} onChange={setPw} type="password" />
          {err&&<p style={{color:"var(--brand)",fontSize:12,marginBottom:12,textAlign:"center"}}>{err}</p>}
          <Btn onClick={go} variant="primary" full size="lg" style={{opacity:loading?.7:1}}>
            {loading?"Signing in...":"Sign In →"}
          </Btn>
        </div>
        <Btn onClick={()=>nav("/")} variant="ghost" size="sm" style={{margin:"16px auto 0",display:"block"}}>← Back to Home</Btn>
      </div>
    </div>
  );
}

// ── SCAN / QR REDIRECT ────────────────────────────────
function ScanPage({cafeId,nav}) {
  const {start}=useScan();
  const cafe=CAFES.find(c=>c.id===cafeId);
  useEffect(()=>{if(cafe){start(cafeId);setTimeout(()=>nav(`/cafe/${cafeId}`),1400);}},[cafeId]);
  if(!cafe)return<Page404 nav={nav}/>;
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--dark,#0D0C0A)",color:"#fff",gap:16}}>
      <div style={{fontSize:52}}>📱</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:26,fontWeight:800}}>QR Scanned!</h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:14}}>Redirecting to {cafe.name}…</p>
      <Spin />
    </div>
  );
}

// ── RESTRICTED PAGE ───────────────────────────────────
function UnauthCafe({sid,nav}) {
  const {exit}=useScan();
  const locked=CAFES.find(c=>c.id===sid);
  return (
    <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:40}}>
      <div style={{fontSize:60}}>🔒</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:26,fontWeight:800,marginTop:14,marginBottom:8}}>Access Restricted</h2>
      <p style={{color:"var(--text3)",maxWidth:400,lineHeight:1.65,fontSize:14,marginBottom:26}}>Your QR session is locked to <strong>{locked?.name}</strong>. You can't access other cafés in this session.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
        <Btn onClick={()=>nav(`/cafe/${sid}`)} variant="primary">Go to {locked?.name}</Btn>
        <Btn onClick={()=>{exit();nav("/cafes");}} variant="secondary">Exit Session</Btn>
      </div>
    </div>
  );
}

function Page404({nav}) {
  return (
    <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:40}}>
      <div style={{fontFamily:"var(--fd)",fontSize:96,fontWeight:900,color:"var(--border2)",lineHeight:1}}>404</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:24,marginTop:10}}>Page Not Found</h2>
      <p style={{color:"var(--text3)",marginTop:6,fontSize:13,marginBottom:24}}>This page doesn't exist.</p>
      <Btn onClick={()=>nav("/")} variant="primary">Go Home</Btn>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════

function AdminLayout({children,nav,path,user}) {
  const {logout}=useAuth();
  const [collapsed,setCollapsed]=useState(false);
  const [mOpen,setMOpen]=useState(false);
  const items=user?.role==="admin"
    ?[{p:"/admin/dashboard",l:"Dashboard",ic:"📊"},{p:"/admin/cafes",l:"Cafés",ic:"☕"},{p:"/admin/users",l:"Users",ic:"👥"},{p:"/admin/offers",l:"Offers",ic:"🎉"}]
    :[{p:"/admin/dashboard",l:"Dashboard",ic:"📊"},{p:"/admin/cafes",l:"Cafés",ic:"☕"},{p:"/admin/offers",l:"Offers",ic:"🎉"}];

  const Sidebar=({mobile=false})=>(
    <div style={{width:mobile?240:collapsed?62:220,background:"var(--bg2)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",height:"100vh",transition:"width .25s",flexShrink:0,overflow:"hidden",position:mobile?"fixed":"static",zIndex:mobile?300:"auto",top:0,left:0}}>
      <div style={{padding:"18px 14px 14px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        {(!collapsed||mobile)&&<div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
          <div style={{width:32,height:32,borderRadius:8,background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:15}}>☕</div>
          <div style={{minWidth:0}}>
            <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:14,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>CaféHub</div>
            <div style={{fontSize:10,color:"var(--text4)",textTransform:"capitalize"}}>{user?.role}</div>
          </div>
        </div>}
        {collapsed&&!mobile&&<div style={{width:32,height:32,borderRadius:8,background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",fontSize:15}}>☕</div>}
        {!mobile&&<button onClick={()=>setCollapsed(c=>!c)} style={{background:"var(--bg3)",border:"none",borderRadius:7,width:24,height:24,cursor:"pointer",fontSize:12,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{collapsed?"»":"«"}</button>}
        {mobile&&<button onClick={()=>setMOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"var(--text3)"}}>×</button>}
      </div>
      <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
        {items.map(item=>{
          const act=path===item.p;
          return (
            <div
            key={item.p}
            onClick={() => {
              nav(item.p);
              if (mobile) setMOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px",
              borderRadius: 10,
              marginBottom: 3,
              cursor: "pointer",
              background: act ? "rgba(255,92,53,0.1)" : "transparent",
              color: act ? "var(--brand)" : "var(--text3)",
              transition: "all .18s ease",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (!act) {
                e.currentTarget.style.background = "var(--bg3)";
                e.currentTarget.style.color = "var(--text)";
              }
            }}
            onMouseLeave={(e) => {
              if (!act) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text3)";
              }
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>
              {item.ic}
            </span>
          
            {(!collapsed || mobile) && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: act ? 600 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {item.l}
              </span>
            )}
          
            {act && !collapsed && (
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--brand)",
                  marginLeft: "auto",
                }}
              />
            )}
          </div>
          );
        })}
      </nav>
      <div style={{padding:"12px 8px",borderTop:"1px solid var(--border)"}}>
        <ThemeToggle size={28} />
        {(!collapsed||mobile)&&<>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,marginBottom:10}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{user?.avatar}</div>
            <div style={{minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name}</div>
              <div style={{fontSize:10,color:"var(--text4)",textTransform:"capitalize"}}>{user?.role}</div>
            </div>
          </div>
          <Btn onClick={()=>{logout();nav("/");}} variant="ghost" full size="sm">Sign Out</Btn>
          <Btn onClick={()=>{nav("/");}} variant="ghost" full size="sm" style={{marginTop:4,fontSize:11,color:"var(--text4)"}}>← View Site</Btn>
        </>}
      </div>
    </div>
  );

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"var(--bg)"}}>
      {/* Desktop sidebar */}
      <div className="hm"><Sidebar /></div>
      {/* Mobile sidebar overlay */}
      {mOpen&&<div className="hd" onClick={()=>setMOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:250,backdropFilter:"blur(4px)"}} />}
      {mOpen&&<div className="hd"><Sidebar mobile /></div>}
      {/* Content */}
      <div style={{flex:1,overflow:"auto",minWidth:0}}>
        {/* Mobile top bar */}
        <div className="hd" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--bg2)",position:"sticky",top:0,zIndex:100}}>
          <button onClick={()=>setMOpen(true)} style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:8,padding:"7px 9px",cursor:"pointer",fontSize:15}}>☰</button>
          <span style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:15}}>☕ Admin</span>
          <ThemeToggle size={30} />
        </div>
        {children}
      </div>
    </div>
  );
}

function AdminDash({nav}) {
  const stats=[
    {l:"Total Cafés",v:CAFES.length,ic:"☕",c:"var(--sapphire)",bg:"rgba(61,142,255,0.1)"},
    {l:"Platform Users",v:USERS.length,ic:"👥",c:"var(--emerald)",bg:"rgba(0,200,150,0.1)"},
    {l:"Active Offers",v:Object.values(OFFERS).flat().length,ic:"🎉",c:"var(--gold)",bg:"rgba(245,200,66,0.12)"},
    {l:"Est. Revenue",v:"$48.2K",ic:"💰",c:"var(--brand)",bg:"rgba(255,92,53,0.1)"},
  ];
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{marginBottom:28}}>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Dashboard</h1>
        <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>Platform overview — {new Date().toDateString()}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16,marginBottom:28}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:"var(--card)",borderRadius:16,padding:20,border:"1px solid var(--border)",boxShadow:"var(--sh1)"}}>
            <div style={{width:42,height:42,borderRadius:11,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,marginBottom:14}}>{s.ic}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:26,fontWeight:800}}>{s.v}</div>
            <div style={{color:"var(--text3)",fontSize:12,marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",overflow:"auto"}}>
        <div style={{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontWeight:700,fontSize:15}}>All Cafés</h3>
          <Btn onClick={()=>nav("/admin/cafes")} size="sm" variant="ghost">View All →</Btn>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
            <thead><tr style={{background:"var(--bg3)"}}>
              {["Café","City","Category","Rating","Status","Games"].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:"var(--text4)",fontWeight:700,textTransform:"uppercase",letterSpacing:.4,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {CAFES.slice(0,8).map(c=>(
                <tr key={c.id} style={{borderTop:"1px solid var(--border)",cursor:"pointer",transition:"background .15s"}}
                  onClick={()=>nav(`/cafe/${c.id}`)}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <img src={c.logo} alt="" style={{width:30,height:30,borderRadius:7,objectFit:"cover",flexShrink:0}} />
                      <span style={{fontWeight:600,fontSize:13,whiteSpace:"nowrap"}}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"var(--text3)",whiteSpace:"nowrap"}}>{c.city}</td>
                  <td style={{padding:"12px 16px"}}><Tag color="blue" size="xs">{c.category}</Tag></td>
                  <td style={{padding:"12px 16px"}}><div style={{display:"flex",alignItems:"center",gap:4}}><Stars r={c.rating} size={10} /><span style={{fontSize:12,fontWeight:700}}>{c.rating}</span></div></td>
                  <td style={{padding:"12px 16px"}}><Tag color={c.isOpen?"green":"default"} size="xs">{c.isOpen?"Open":"Closed"}</Tag></td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"var(--text3)"}}>{c.games.length} games</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminCafes({nav}) {
  const toast=useToast();
  const [showCreate,setShowCreate]=useState(false);
  const [form,setForm]=useState({name:"",city:"",cuisine:"",owner:""});
  const [qrModal,setQrModal]=useState(null);
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Manage Cafés</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>{CAFES.length} cafés on platform</p>
        </div>
        <Btn onClick={()=>setShowCreate(true)} variant="primary">+ Create Café</Btn>
      </div>

      <div style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",overflow:"auto"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead><tr style={{background:"var(--bg3)"}}>
              {["Café","City","Owner","Rating","Games","QR","Actions"].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:"var(--text4)",fontWeight:700,textTransform:"uppercase",letterSpacing:.4,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {CAFES.map(c=>(
                <tr key={c.id} style={{borderTop:"1px solid var(--border)"}}>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <img src={c.logo} alt="" style={{width:34,height:34,borderRadius:8,objectFit:"cover",flexShrink:0}} />
                      <div>
                        <div style={{fontWeight:700,fontSize:13}}>{c.name}</div>
                        <div style={{fontSize:10,color:"var(--text4)",fontFamily:"var(--fm)"}}>{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"var(--text3)",whiteSpace:"nowrap"}}>{c.city}</td>
                  <td style={{padding:"12px 16px",fontSize:12,whiteSpace:"nowrap"}}>{USERS.find(u=>u.id===c.ownerId)?.name||<span style={{color:"var(--text4)"}}>Unassigned</span>}</td>
                  <td style={{padding:"12px 16px"}}><span style={{fontWeight:700,fontSize:13}}>{c.rating} ⭐</span></td>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",gap:2}}>{c.games.map(g=><span key={g} style={{fontSize:14}}>{GAMES_INFO[g]?.icon}</span>)}</div>
                  </td>
                  <td style={{padding:"12px 16px"}}>
                    <Btn onClick={()=>setQrModal(c)} size="sm" variant="secondary">📱 QR</Btn>
                  </td>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",gap:5}}>
                      <Btn onClick={()=>nav(`/cafe/${c.id}`)} size="sm" variant="ghost">View</Btn>
                      <Btn onClick={()=>toast("Updated!")} size="sm" variant="secondary">Edit</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create New Café">
        <Inp label="Café Name" placeholder="e.g. The Morning Cup" value={form.name} onChange={v=>setForm(p=>({...p,name:v}))} />
        <Inp label="City" placeholder="New York" value={form.city} onChange={v=>setForm(p=>({...p,city:v}))} />
        <Inp label="Cuisine Type" placeholder="Specialty Coffee" value={form.cuisine} onChange={v=>setForm(p=>({...p,cuisine:v}))} />
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Assign Owner</label>
          <select value={form.owner} onChange={e=>setForm(p=>({...p,owner:e.target.value}))} style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1px solid var(--border2)",fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none"}}>
            <option value="">Select owner...</option>
            {USERS.filter(u=>u.role==="owner").map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div style={{background:"rgba(0,200,150,0.08)",border:"1px solid rgba(0,200,150,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#00C896",marginBottom:16}}>✓ QR Code will be auto-generated for this café</div>
        <Btn onClick={()=>{toast("Café created! QR auto-generated 🎉");setShowCreate(false);}} variant="primary" full size="lg">Create Café + Generate QR</Btn>
      </Modal>

      <Modal open={!!qrModal} onClose={()=>setQrModal(null)} title={`QR Code — ${qrModal?.name}`} w={360}>
        {qrModal&&<div style={{textAlign:"center"}}>
          <div style={{background:"var(--bg3)",borderRadius:14,padding:16,display:"inline-block",marginBottom:16}}>
            <QRCode cafeId={qrModal.id} size={180} />
          </div>
          <p style={{color:"var(--text3)",fontSize:13,marginBottom:8}}>Scan to visit <strong>{qrModal.name}</strong></p>
          <div style={{fontFamily:"var(--fm)",fontSize:11,background:"var(--bg3)",borderRadius:8,padding:"6px 12px",display:"inline-block",color:"var(--text4)"}}>
            /cafe/{qrModal.id}
          </div>
          <div style={{marginTop:14}}>
            <a href={genQR(qrModal.id)} download target="_blank" rel="noreferrer">
              <Btn variant="primary" size="sm">⬇ Download QR</Btn>
            </a>
          </div>
        </div>}
      </Modal>
    </div>
  );
}

function AdminUsers() {
  const toast=useToast();
  const [showAdd,setShowAdd]=useState(false);
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Users & Staff</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>Manage roles and access</p>
        </div>
        <Btn onClick={()=>setShowAdd(true)} variant="primary">+ Add User</Btn>
      </div>
      <div style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",overflow:"auto"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
            <thead><tr style={{background:"var(--bg3)"}}>
              {["User","Email","Role","Joined","Actions"].map(h=>(
                <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,color:"var(--text4)",fontWeight:700,textTransform:"uppercase",letterSpacing:.4,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {USERS.map(u=>(
                <tr key={u.id} style={{borderTop:"1px solid var(--border)"}}>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,flexShrink:0}}>{u.avatar}</div>
                      <span style={{fontWeight:600,fontSize:13}}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"var(--text3)"}}>{u.email}</td>
                  <td style={{padding:"12px 16px"}}><Tag color={u.role==="admin"?"brand":u.role==="subadmin"?"blue":"green"} size="xs">{u.role}</Tag></td>
                  <td style={{padding:"12px 16px",fontSize:12,color:"var(--text4)"}}>{u.joined}</td>
                  <td style={{padding:"12px 16px"}}><Btn onClick={()=>toast("Updated!")} size="sm" variant="secondary">Edit</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add New User">
        <Inp label="Full Name" placeholder="Jane Smith" value="" onChange={()=>{}} />
        <Inp label="Email" placeholder="jane@cafehub.com" value="" onChange={()=>{}} />
        <Inp label="Password" type="password" placeholder="•••••••" value="" onChange={()=>{}} />
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Role</label>
          <select style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1px solid var(--border2)",fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none"}}>
            <option value="owner">Café Owner</option>
            <option value="subadmin">SubAdmin</option>
          </select>
        </div>
        <Btn onClick={()=>{toast("User created!");setShowAdd(false);}} variant="primary" full size="lg">Create User</Btn>
      </Modal>
    </div>
  );
}

function AdminOffers() {
  const toast=useToast();
  const all=Object.entries(OFFERS).flatMap(([cid,os])=>os.map(o=>({...o,cafeId:cid,cafeName:CAFES.find(c=>c.id===cid)?.name})));
  return (
    <div style={{padding:"28px 24px"}}>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800,marginBottom:6}}>Platform Offers</h1>
      <p style={{color:"var(--text3)",fontSize:13,marginBottom:24}}>{all.length} offers across all cafés</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
        {all.slice(0,12).map(o=>{
          const c=CAFES.find(c=>c.id===o.cafeId);
          return (
            <div key={o.id} style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",overflow:"hidden"}}>
              <div style={{background:`linear-gradient(135deg,${c?.color||"#FF5C35"} 0%,${c?.color||"#FF5C35"}88 100%)`,padding:"16px 18px",color:"#fff"}}>
                <div style={{fontSize:20,fontWeight:900,marginBottom:2}}>{o.discount}</div>
                <div style={{fontWeight:700,fontSize:14}}>{o.title}</div>
              </div>
              <div style={{padding:14}}>
                <p style={{fontSize:11,color:"var(--text4)",marginBottom:6}}>📍 {o.cafeName}</p>
                <code style={{background:"var(--bg3)",borderRadius:6,padding:"4px 8px",fontSize:11,fontFamily:"var(--fm)"}}>{o.code}</code>
                <div style={{marginTop:10}}>
                  <Btn onClick={()=>toast("Removed")} size="sm" variant="ghost" style={{color:"var(--brand)"}}>Remove</Btn>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// OWNER PANEL
// ═══════════════════════════════════════════════════════

function OwnerLayout({children,nav,path,user}) {
  const {logout}=useAuth();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const [mOpen,setMOpen]=useState(false);
  const items=[
    {p:"/owner/dashboard",l:"Dashboard",ic:"📊"},
    {p:"/owner/menu",l:"Menu",ic:"📋"},
    {p:"/owner/offers",l:"Offers",ic:"🎉"},
    {p:"/owner/games",l:"Games",ic:"🎮"},
    {p:"/owner/analytics",l:"Analytics",ic:"📈"},
    {p:"/owner/settings",l:"Settings",ic:"⚙️"},
  ];

  const Sidebar=({mobile=false})=>(
    <div style={{width:220,background:"var(--bg2)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",height:"100vh",flexShrink:0,overflow:"hidden",position:mobile?"fixed":"static",zIndex:mobile?300:"auto",top:0,left:0}}>
      <div style={{padding:"16px 14px",borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {cafe&&<img src={cafe.logo} alt="" style={{width:34,height:34,borderRadius:9,objectFit:"cover",flexShrink:0}} />}
          <div style={{minWidth:0}}>
            <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:13,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cafe?.name||"My Café"}</div>
            <div style={{fontSize:10,color:"var(--text4)"}}>Owner Panel</div>
          </div>
          {mobile&&<button onClick={()=>setMOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"var(--text3)",marginLeft:"auto"}}>×</button>}
        </div>
      </div>
      <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
        {items.map(item=>{
          const act=path===item.p;
          return (
            <div
            key={item.p}
            onClick={() => {
              nav(item.p);
              if (mobile) setMOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px",
              borderRadius: 10,
              marginBottom: 3,
              cursor: "pointer",
              background: act
                ? `${cafe?.color || "#FF5C35"}18`
                : "transparent",
              color: act
                ? cafe?.color || "var(--brand)"
                : "var(--text3)",
              transition: "all .18s ease",
            }}
            onMouseEnter={(e) => {
              if (!act) {
                e.currentTarget.style.background = "var(--bg3)";
                e.currentTarget.style.color = "var(--text)";
              }
            }}
            onMouseLeave={(e) => {
              if (!act) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text3)";
              }
            }}
          >
            <span style={{ fontSize: 16 }}>
              {item.ic}
            </span>
          
            <span
              style={{
                fontSize: 13,
                fontWeight: act ? 700 : 400,
              }}
            >
              {item.l}
            </span>
          </div>
          );
        })}
      </nav>
      <div style={{padding:"12px 8px",borderTop:"1px solid var(--border)"}}>
        <ThemeToggle size={26} />
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:cafe?.color||"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{user?.avatar}</div>
          <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name}</div>
        </div>
        <Btn onClick={()=>{logout();nav("/");}} variant="ghost" full size="sm">Sign Out</Btn>
        {cafe&&<Btn onClick={()=>nav(`/cafe/${cafe.id}`)} variant="ghost" full size="sm" style={{marginTop:4,fontSize:11,color:"var(--text4)"}}>View My Café →</Btn>}
      </div>
    </div>
  );

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"var(--bg)"}}>
      <div className="hm"><Sidebar /></div>
      {mOpen&&<div className="hd" onClick={()=>setMOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:250}} />}
      {mOpen&&<div className="hd"><Sidebar mobile /></div>}
      <div style={{flex:1,overflow:"auto",minWidth:0}}>
        <div className="hd" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--bg2)",position:"sticky",top:0,zIndex:100}}>
          <button onClick={()=>setMOpen(true)} style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:8,padding:"7px 9px",cursor:"pointer",fontSize:15}}>☰</button>
          <span style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:14}}>{cafe?.name||"Owner Panel"}</span>
          <ThemeToggle size={30} />
        </div>
        {children}
      </div>
    </div>
  );
}

function OwnerDash({nav}) {
  const {user}=useAuth();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const [qrOpen,setQrOpen]=useState(false);
  if(!cafe)return<div style={{padding:40,color:"var(--text3)"}}>No café assigned.</div>;
  const menuCount=(MENU_ITEMS[cafe.id]||[]).length;
  const offersCount=(OFFERS[cafe.id]||[]).length;
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Dashboard</h1>
        <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>{cafe.name} — {cafe.city}</p>
      </div>

      {/* QR Hero */}
      <div style={{background:`linear-gradient(135deg,${cafe.color} 0%,${cafe.color}CC 100%)`,borderRadius:20,padding:"clamp(20px,3vw,28px)",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20,boxShadow:`0 8px 32px ${cafe.color}44`}}>
        <div>
          <h3 style={{fontFamily:"var(--fd)",fontSize:"clamp(18px,2.5vw,22px)",fontWeight:800,color:"#fff",marginBottom:6}}>Your Café QR Code</h3>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,marginBottom:16}}>Share or display to let customers scan & order</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn onClick={()=>setQrOpen(true)} size="sm" style={{background:"rgba(255,255,255,0.2)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",backdropFilter:"blur(6px)"}}>📱 Preview QR</Btn>
            <a href={genQR(cafe.id)} download target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
              <Btn size="sm" style={{background:"rgba(255,255,255,0.2)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)"}}>⬇ Download</Btn>
            </a>
            <Btn onClick={()=>nav(`/scan/${cafe.id}`)} size="sm" style={{background:"rgba(255,255,255,0.2)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)"}}>🔗 Test Scan</Btn>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:12,padding:8,flexShrink:0}}>
          <QRCode cafeId={cafe.id} size={90} />
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:14,marginBottom:22}}>
        {[
          {l:"Menu Items",v:menuCount,ic:"📋",c:"rgba(61,142,255,0.1)",t:"var(--sapphire)"},
          {l:"Active Offers",v:offersCount,ic:"🎉",c:"rgba(255,92,53,0.1)",t:"var(--brand)"},
          {l:"Rating",v:`${cafe.rating}⭐`,ic:"⭐",c:"rgba(245,200,66,0.12)",t:"var(--gold)"},
          {l:"Reviews",v:cafe.reviews.toLocaleString(),ic:"💬",c:"rgba(0,200,150,0.1)",t:"var(--emerald)"},
          {l:"Games",v:cafe.games.length,ic:"🎮",c:"rgba(124,92,255,0.1)",t:"var(--violet)"},
        ].map(s=>(
          <div key={s.l} style={{background:"var(--card)",borderRadius:14,padding:"18px 16px",border:"1px solid var(--border)",boxShadow:"var(--sh1)"}}>
            <div style={{width:38,height:38,borderRadius:10,background:s.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,marginBottom:10}}>{s.ic}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:800,color:s.t}}>{s.v}</div>
            <div style={{color:"var(--text4)",fontSize:11,marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Café info */}
      <div style={{background:"var(--card)",borderRadius:16,padding:22,border:"1px solid var(--border)",boxShadow:"var(--sh1)"}}>
        <h3 style={{fontWeight:700,fontSize:15,marginBottom:16}}>Café Status</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
          {[
            {l:"Status",v:<Tag color={cafe.isOpen?"green":"default"}>{cafe.isOpen?"Open":"Closed"}</Tag>},
            {l:"Category",v:cafe.category},
            {l:"Hours",v:`${cafe.openTime}–${cafe.closeTime}`},
            {l:"Price Range",v:cafe.priceRange},
          ].map(({l,v})=>(
            <div key={l}>
              <div style={{fontSize:11,color:"var(--text4)",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:.4}}>{l}</div>
              <div style={{fontWeight:600,fontSize:13}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={qrOpen} onClose={()=>setQrOpen(false)} title="QR Code Preview" w={340}>
        <div style={{textAlign:"center"}}>
          <div style={{background:"var(--bg3)",borderRadius:14,padding:16,display:"inline-block",marginBottom:14}}>
            <QRCode cafeId={cafe.id} size={180} />
          </div>
          <p style={{fontSize:13,color:"var(--text3)",marginBottom:6}}>{cafe.name}</p>
          <div style={{fontFamily:"var(--fm)",fontSize:11,background:"var(--bg3)",borderRadius:8,padding:"6px 12px",display:"inline-block"}}>/cafe/{cafe.id}</div>
        </div>
      </Modal>
    </div>
  );
}

function OwnerMenu() {
  const {user}=useAuth();
  const toast=useToast();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const items=MENU_ITEMS[user?.cafeId]||[];
  const [showAdd,setShowAdd]=useState(false);
  const cats=[...new Set(items.map(i=>i.category))];
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Menu</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>{items.length} items · {cats.length} categories</p>
        </div>
        <Btn onClick={()=>setShowAdd(true)} variant="primary">+ Add Item</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16}}>
        {items.map(item=>(
          <div key={item.id} style={{background:"var(--card)",borderRadius:16,border:"1px solid var(--border)",overflow:"hidden",boxShadow:"var(--sh1)"}}>
            <img src={item.image} alt={item.name} style={{width:"100%",height:130,objectFit:"cover"}} />
            <div style={{padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:6}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{item.name}</div>
                  <Tag color="default" size="xs" style={{marginTop:4}}>{item.category}</Tag>
                </div>
                <div style={{fontWeight:800,fontSize:15,color:cafe?.color||"var(--brand)"}}>${item.price.toFixed(2)}</div>
              </div>
              <p style={{color:"var(--text3)",fontSize:11,lineHeight:1.5,marginBottom:12}}>{item.desc}</p>
              <div style={{display:"flex",gap:6}}>
                <Btn onClick={()=>toast("Item updated!")} variant="secondary" size="sm" style={{flex:1}}>Edit</Btn>
                <Btn onClick={()=>toast("Removed")} size="sm" style={{flex:1,background:"rgba(255,92,53,0.08)",color:"var(--brand)",border:"1px solid rgba(255,92,53,0.2)"}}>Remove</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add Menu Item">
        <Inp label="Item Name" placeholder="e.g. Caramel Latte" value="" onChange={()=>{}} />
        <Inp label="Description" placeholder="A delicious..." value="" onChange={()=>{}} />
        <Inp label="Price ($)" type="number" placeholder="4.50" value="" onChange={()=>{}} />
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Category</label>
          <select style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1px solid var(--border2)",fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none"}}>
            {["Coffee","Tea","Food","Pastries","Specials"].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <Btn onClick={()=>{toast("Item added!");setShowAdd(false);}} variant="primary" full size="lg">Add to Menu</Btn>
      </Modal>
    </div>
  );
}

function OwnerOffers() {
  const {user}=useAuth();
  const toast=useToast();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const offers=OFFERS[user?.cafeId]||[];
  const [showAdd,setShowAdd]=useState(false);
  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Offers</h1>
          <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>{offers.length} active promotions</p>
        </div>
        <Btn onClick={()=>setShowAdd(true)} variant="primary">+ Create Offer</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {offers.map(o=>(
          <div key={o.id} style={{background:"var(--card)",borderRadius:18,border:"1px solid var(--border)",overflow:"hidden",boxShadow:"var(--sh1)"}}>
            <div style={{background:`linear-gradient(135deg,${cafe?.color||"#FF5C35"} 0%,${cafe?.color||"#FF5C35"}99 100%)`,padding:"18px 20px",color:"#fff",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:-24,top:-24,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.1)"}} />
              <div style={{fontSize:22,fontWeight:900,marginBottom:3}}>{o.discount}</div>
              <div style={{fontWeight:700}}>{o.title}</div>
            </div>
            <div style={{padding:18}}>
              <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,marginBottom:12}}>{o.desc}</p>
              <div style={{fontFamily:"var(--fm)",fontSize:12,background:"var(--bg3)",borderRadius:7,padding:"6px 10px",marginBottom:12,letterSpacing:.5,fontWeight:700}}>{o.code}</div>
              <div style={{display:"flex",gap:6}}>
                <Btn onClick={()=>toast("Updated!")} variant="secondary" size="sm" style={{flex:1}}>Edit</Btn>
                <Btn onClick={()=>toast("Removed")} size="sm" style={{flex:1,background:"rgba(255,92,53,0.08)",color:"var(--brand)",border:"1px solid rgba(255,92,53,0.2)"}}>Remove</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Create Offer">
        <Inp label="Offer Title" placeholder="e.g. Morning Rush" value="" onChange={()=>{}} />
        <Inp label="Description" placeholder="Details of the offer..." value="" onChange={()=>{}} />
        <Inp label="Discount" placeholder="e.g. 20% or Free Coffee" value="" onChange={()=>{}} />
        <Inp label="Coupon Code" placeholder="e.g. SAVE20" value="" onChange={()=>{}} />
        <Inp label="Valid Till" type="date" value="" onChange={()=>{}} />
        <Btn onClick={()=>{toast("Offer created!");setShowAdd(false);}} variant="primary" full size="lg">Create Offer</Btn>
      </Modal>
    </div>
  );
}

// ── OWNER GAMES MANAGEMENT ────────────────────────────
function OwnerGames() {
  const {user}=useAuth();
  const toast=useToast();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const allGames=Object.values(GAMES_INFO);
  const [enabled,setEnabled]=useState(new Set(cafe?.games||[]));
  const [preview,setPreview]=useState(null);

  const toggle=(id)=>{
    setEnabled(prev=>{
      const n=new Set(prev);
      if(n.has(id))n.delete(id);else n.add(id);
      return n;
    });
    toast(enabled.has(id)?"Game hidden from customers":"Game enabled for customers! 🎮");
  };

  return (
    <div style={{padding:"28px 24px"}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800}}>Games Management</h1>
        <p style={{color:"var(--text3)",fontSize:13,marginTop:3}}>Choose which games to show your customers</p>
      </div>

      <div style={{background:"rgba(124,92,255,0.08)",border:"1px solid rgba(124,92,255,0.2)",borderRadius:12,padding:"12px 16px",fontSize:13,color:"var(--violet)",marginBottom:22}}>
        🎮 Games enabled here will appear on your café's public page. Customers can play while waiting for orders!
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
        {allGames.map(g=>{
          const on=enabled.has(g.id);
          return (
            <div key={g.id} style={{background:"var(--card)",borderRadius:18,border:`2px solid ${on?cafe?.color||"var(--brand)":"var(--border)"}`,padding:20,transition:"all .2s",boxShadow:on?"var(--sh2)":"var(--sh1)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:12}}>
                <div style={{fontSize:36}}>{g.icon}</div>
                {/* Toggle */}
                <div onClick={()=>toggle(g.id)} style={{width:44,height:24,borderRadius:12,background:on?cafe?.color||"var(--brand)":"var(--border2)",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:on?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}} />
                </div>
              </div>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:4}}>{g.name}</h3>
              <p style={{fontSize:12,color:"var(--text3)",marginBottom:10,lineHeight:1.5}}>{g.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Tag color="default" size="xs">{g.cat} · {g.plays} plays</Tag>
                <Btn onClick={()=>setPreview(g)} size="sm" variant="ghost">Preview</Btn>
              </div>
              {on&&<div style={{marginTop:10}}>
                <Tag color="green" size="xs">✓ Visible to customers</Tag>
              </div>}
            </div>
          );
        })}
      </div>

      <Modal open={!!preview} onClose={()=>setPreview(null)} title={`Preview — ${preview?.name}`} w={420}>
        {preview?.id==="snake"&&<SnakeGame cafeColor={cafe?.color} />}
        {preview?.id==="memory"&&<MemoryGame cafeColor={cafe?.color} />}
        {preview?.id==="flappy"&&<FlappyGame cafeColor={cafe?.color} />}
        {preview?.id==="wordscramble"&&<WordScramble cafeColor={cafe?.color} />}
      </Modal>
    </div>
  );
}

function OwnerAnalytics() {
  const {user}=useAuth();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const months=["Jan","Feb","Mar","Apr","May","Jun"];
  const rev=[3800,5200,4600,6800,5900,7800];
  const orders=[120,182,156,240,198,276];
  const maxR=Math.max(...rev);
  return (
    <div style={{padding:"28px 24px"}}>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800,marginBottom:4}}>Analytics</h1>
      <p style={{color:"var(--text3)",fontSize:13,marginBottom:24}}>{cafe?.name} — last 6 months</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:14,marginBottom:24}}>
        {[{l:"Monthly Revenue",v:"$7,800",ch:"+32%",pos:true},{l:"Total Orders",v:"276",ch:"+14%",pos:true},{l:"Avg. Order",v:"$28.26",ch:"+7%",pos:true},{l:"New Customers",v:"94",ch:"-2%",pos:false}].map(s=>(
          <div key={s.l} style={{background:"var(--card)",borderRadius:14,padding:"18px 16px",border:"1px solid var(--border)"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:800,marginBottom:2}}>{s.v}</div>
            <div style={{color:"var(--text4)",fontSize:11,marginBottom:6}}>{s.l}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.pos?"var(--emerald)":"var(--brand)"}}>{s.ch} vs last mo.</div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div style={{background:"var(--card)",borderRadius:16,padding:22,border:"1px solid var(--border)",marginBottom:22}}>
        <h3 style={{fontWeight:700,fontSize:15,marginBottom:20}}>Revenue — Last 6 Months</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:12,height:160}}>
          {months.map((m,i)=>(
            <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div style={{fontSize:10,fontWeight:700,color:"var(--text3)"}}>${(rev[i]/1000).toFixed(1)}k</div>
              <div style={{width:"100%",background:`linear-gradient(to top,${cafe?.color||"#FF5C35"}CC,${cafe?.color||"#FF5C35"}44)`,borderRadius:"6px 6px 0 0",height:`${(rev[i]/maxR)*130}px`,transition:"height .5s ease",minHeight:4}} />
              <div style={{fontSize:11,color:"var(--text4)"}}>{m}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Game analytics */}
      <div style={{background:"var(--card)",borderRadius:16,padding:22,border:"1px solid var(--border)"}}>
        <h3 style={{fontWeight:700,fontSize:15,marginBottom:16}}>🎮 Game Engagement</h3>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {cafe?.games.map((gid,i)=>{
            const g=GAMES_INFO[gid];
            const plays=[1240,832,2105,455][i]||400;
            return (
              <div key={gid} style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:20,width:28}}>{g?.icon}</span>
                <span style={{fontSize:13,fontWeight:600,minWidth:130}}>{g?.name}</span>
                <div style={{flex:1,height:8,background:"var(--bg3)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:99,width:`${Math.min((plays/2500)*100,100)}%`,background:cafe?.color||"var(--brand)"}} />
                </div>
                <span style={{fontSize:12,color:"var(--text4)",minWidth:40,textAlign:"right"}}>{plays.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OwnerSettings() {
  const {user}=useAuth();
  const toast=useToast();
  const cafe=CAFES.find(c=>c.id===user?.cafeId);
  const [form,setForm]=useState({name:cafe?.name||"",phone:cafe?.phone||"",email:cafe?.email||"",openTime:cafe?.openTime||"",closeTime:cafe?.closeTime||"",desc:cafe?.desc||""});
  return (
    <div style={{padding:"28px 24px"}}>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,2.5vw,26px)",fontWeight:800,marginBottom:4}}>Settings</h1>
      <p style={{color:"var(--text3)",fontSize:13,marginBottom:24}}>Update your café profile</p>
      <div style={{background:"var(--card)",borderRadius:18,padding:"24px 22px",border:"1px solid var(--border)",maxWidth:580,boxShadow:"var(--sh1)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
          <Inp label="Café Name" value={form.name} onChange={v=>setForm(p=>({...p,name:v}))} placeholder="Café name" />
          <Inp label="Phone" value={form.phone} onChange={v=>setForm(p=>({...p,phone:v}))} placeholder="+1 000-000" />
          <Inp label="Email" value={form.email} onChange={v=>setForm(p=>({...p,email:v}))} placeholder="hello@cafe.com" />
          <div style={{display:"flex",gap:8}}>
            <Inp label="Opens" value={form.openTime} onChange={v=>setForm(p=>({...p,openTime:v}))} placeholder="7AM" style={{flex:1}} />
            <Inp label="Closes" value={form.closeTime} onChange={v=>setForm(p=>({...p,closeTime:v}))} placeholder="10PM" style={{flex:1}} />
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Description</label>
          <textarea value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} rows={4}
            style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1px solid var(--border2)",fontSize:13,fontFamily:"var(--fb)",background:"var(--bg)",color:"var(--text)",outline:"none",resize:"vertical"}} />
        </div>
        <Btn onClick={()=>toast("Saved! ✓")} variant="primary" size="lg">Save Changes</Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PROTECTED ROUTE
// ═══════════════════════════════════════════════════════
function Protected({children,roles,nav}) {
  const {user}=useAuth();
  useEffect(()=>{if(!user){nav("/login");}},[user]);
  if(!user)return<Spin />;
  if(roles&&!roles.includes(user.role)){nav("/");return null;}
  return children;
}

// ═══════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════
function Router() {
  const {path,nav}=useRoute();
  const {user}=useAuth();
  const parts=path.split("/").filter(Boolean);
  const [s,p,q]=parts;

  if(s==="login")return<LoginPage nav={nav}/>;
  if(s==="scan"&&p)return<ScanPage cafeId={p} nav={nav}/>;

  if(s==="admin")return(
    <Protected roles={["admin","subadmin"]} nav={nav}>
      <AdminLayout nav={nav} path={path} user={user}>
        {(!p||p==="dashboard")&&<AdminDash nav={nav}/>}
        {p==="cafes"&&<AdminCafes nav={nav}/>}
        {p==="users"&&<AdminUsers/>}
        {p==="offers"&&<AdminOffers/>}
      </AdminLayout>
    </Protected>
  );

  if(s==="owner")return(
    <Protected roles={["owner"]} nav={nav}>
      <OwnerLayout nav={nav} path={path} user={user}>
        {(!p||p==="dashboard")&&<OwnerDash nav={nav}/>}
        {p==="menu"&&<OwnerMenu/>}
        {p==="offers"&&<OwnerOffers/>}
        {p==="games"&&<OwnerGames/>}
        {p==="analytics"&&<OwnerAnalytics/>}
        {p==="settings"&&<OwnerSettings/>}
      </OwnerLayout>
    </Protected>
  );

  // Public
  const withNav=(child)=>(
    <>
      <PublicNav nav={nav} path={path} />
      {child}
    </>
  );

  if(!s||s==="")return withNav(<HomePage nav={nav}/>);
  if(s==="cafes")return withNav(<CafesPage nav={nav}/>);
  if(s==="cafe"&&p&&!q)return withNav(<CafeDetailPage cafeId={p} nav={nav}/>);
  if(s==="cafe"&&p&&q==="menu")return withNav(<MenuPage cafeId={p} nav={nav}/>);
  if(s==="cafe"&&p&&q==="offers")return withNav(<OffersPage cafeId={p} nav={nav}/>);
  if(s==="cart")return withNav(<CartPage nav={nav}/>);
  return withNav(<Page404 nav={nav}/>);
}

// ═══════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════
export default function App() {
  return (
    <>
      <G/>
      <ThemeProvider>
        <AuthProvider>
          <ScanProvider>
            <CartProvider>
              <ToastProvider>
                <Router/>
              </ToastProvider>
            </CartProvider>
          </ScanProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
