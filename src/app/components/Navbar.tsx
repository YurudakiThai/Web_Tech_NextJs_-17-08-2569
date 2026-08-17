import Link from "src/app"

export default function Navbar() {
  return (

<nav className="navbar" aria-label="เมนูหลัก"> 
      <ul className="navList"> 
        <li> 
          <Link className="navLink" href="/page.tsx"> 
            หน้าแรก 
          </Link> 
        </li> 
        <li> 
          <Link className="navLink" href="courses/page.tsx"> 
            รายวิชา 
          </Link> 
        </li> 
        <li> 
          <Link className="navLink" href="about/page.tsx"> 
            เกี่ยวกับ 
          </Link> 
        </li> 
      </ul> 
    </nav> 
  );
}
