import {Course} from "@/src/types/course";
export const courses: Course[] = [ 
  // นำข้อมูลรายวิชาที่สร้างไว้มาใส่ที่นี่ 
    {
      id: 1,
      code: "10301231",
      title: "Web Technology",
      credits: 3,
      isOpen: true,
    },
    {
      id: 2, 
      code: "10301232", 
      title: "Database Systems", 
      credits: 3, 
      isOpen: false,
    },
    {
      id: 3,
      code: "6804101333",
      title: "Thanakrit Na Lumphun",
      credits: 3,
      isOpen: true,
    }
];
