"use client";

import React from "react";

interface CourseItem {
  chapter: string;
  name: string;
  ingredients: string;
  note?: string;
}

const COURSES: CourseItem[] = [
  {
    chapter: "CHƯƠNG I",
    name: "Khai Vị Tinh Thuần",
    ingredients: "Mực Thỏ Cát Bà · Dưa Lưới Khói · Nhụy Hoa Nghệ Tây bản địa",
  },
  {
    chapter: "CHƯƠNG II",
    name: "Biển Đêm Tĩnh Lặng",
    ingredients: "Sò Điệp Phan Thiết · Nước Dừa Lên Men · Dầu Ngổ Ôm ủ lạnh",
  },
  {
    chapter: "CHƯƠNG III",
    name: "Hương Đồng Gió Nắng",
    ingredients: "Bánh Cuốn Tráng Tay Tấm Nếp · Nấm Mối Rừng · Cốt Nấm Đông Cô Ủ 72 Giờ",
  },
  {
    chapter: "CHƯƠNG IV",
    name: "Hải Tinh Sơn Mài",
    ingredients: "Cá Lăng Sông Cấm · Lá Lốt Nướng Than Mịn · Sốt Tía Tô Chín & Dầu Mè Gần",
    note: "Món ăn biểu tượng mùa hạ",
  },
  {
    chapter: "CHƯƠNG V",
    name: "Đậm Đàm Di Sản",
    ingredients: "Bò H'Mông Ủ Tuyết Than Củi · Tiêu Rừng Măng Giang · Củ Cải Sơn La",
  },
  {
    chapter: "CHƯƠNG VI",
    name: "Khoảnh Khắc Giao Mùa",
    ingredients: "Tuyết Yến Chanh Cốm Vòng · Kem Nếp Than Ửng Đỏ · Rượu Cần Mẫu Sơn",
  },
  {
    chapter: "CHƯƠNG VII",
    name: "Kết Ẩm Tĩnh Lặng",
    ingredients: "Bánh Mật Sơn Mài Khảm Mứt Vỏ Cam · Trà Shan Tuyết Cổ Thụ Hà Giang 300 Năm",
  },
];

export function TastingMenu() {
  return (
    <section id="thuc-don" className="bg-[#14100D] py-24 md:py-36 px-6 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B98A45] font-sans mb-3">
            Hành trình vị giác
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#EDE6D8] tracking-wider uppercase font-light">
            Thực đơn nếm theo mùa
          </h2>
          <p className="text-xs tracking-[0.2em] text-[#9A9186] uppercase font-sans mt-4">
            Thực đơn 7 chương · Phục vụ kèm ghép rượu (Wine pairing) tùy chọn
          </p>
        </div>

        {/* Courses Sequential List (No card shapes, pure typography & hairlines) */}
        <div className="space-y-0">
          {COURSES.map((course, index) => (
            <div
              key={course.chapter}
              className="py-8 md:py-10 border-b border-[#B98A45]/20 group hover:bg-[#1E1813]/40 transition-colors duration-300 px-4 md:px-6"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
                {/* Chapter Number */}
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs tracking-[0.25em] text-[#B98A45] font-sans font-medium uppercase">
                    {course.chapter}
                  </span>
                  {course.note && (
                    <span className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 border border-[#8E2C24]/60 text-[#EDE6D8]/80 bg-[#8E2C24]/20 font-sans">
                      {course.note}
                    </span>
                  )}
                </div>

                {/* Course Name */}
                <div className="flex-grow">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#EDE6D8] font-normal tracking-wide group-hover:text-[#B98A45] transition-colors duration-300">
                    {course.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#9A9186] font-sans font-light tracking-wider mt-2">
                    {course.ingredients}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Pairing Notes */}
        <div className="mt-16 pt-8 border-t border-[#B98A45]/30 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 text-xs tracking-[0.2em] text-[#9A9186] font-sans">
          <div>
            <span className="text-[#EDE6D8]">2.850.000 VNĐ</span> / Khách (Chưa bao gồm VAT & Phí dịch vụ)
          </div>
          <div>
            Ghép rượu chọn lọc: <span className="text-[#B98A45]">1.650.000 VNĐ</span> / Khách
          </div>
        </div>
      </div>
    </section>
  );
}
