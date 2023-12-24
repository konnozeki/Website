import React from "react";
import "./Actor.scss";

function Actor() {
  //Dữ liệu
  const Actor = {
    Name: "Xuân Bắc",
    Description:
      "Nguyễn Xuân Bắc (sinh ngày 21 tháng 8 năm 1976), thường được biết đến với nghệ danh Xuân Bắc, là một nam diễn viên, nghệ sĩ hài kiêm người dẫn chương trình truyền hình người Việt Nam. Khởi nghiệp từ năm 1995, anh sớm được công chúng và giới chuyên môn biết đến với vai diễn Núi trong bộ phim truyền hình Sóng ở đáy sông, và đồng thời còn là một trong những diễn viên chủ đạo trong các chương trình hài chính luận Gặp nhau cuối tuần và Gặp nhau cuối năm của Đài Truyền hình Việt Nam. Bên cạnh sự nghiệp diễn xuất, anh còn là người dẫn chương trình trong các trò chơi truyền hình Đuổi hình bắt chữ của Đài Phát thanh - Truyền hình Hà Nội và Vua tiếng Việt của VTV3. Với những đóng góp cho những hoạt động nghệ thuật, Xuân Bắc được trao tặng danh hiệu Nghệ sĩ Ưu tú vào năm 2016, và sau này trở thành Nghệ sĩ Nhân dân vào năm 2023.[2] Từ năm 2021, anh được chọn là giám đốc nhà hát kịch Việt Nam, và đến năm 2022, anh được cựu Chủ tịch nước Nguyễn Xuân Phúc trao tặng Huân chương lao động hạng ba.",
    Gender: "M",
    Country: "Vietnam",
    Avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/XuanBac_2019_%28cropped%29.jpg/250px-XuanBac_2019_%28cropped%29.jpg",
  };

  return (
    <div className="container">
      <div className="info-container">
        <div className="avatar-container">
          <img src={Actor.Avatar} alt="Ảnh" className="avatar" />
        </div>
        <div className="info">
          <h1>{Actor.Name}</h1>
          <p className="info-item">Giới tính: {Actor.Gender}</p>
          <p className="info-item">Quốc tịch: {Actor.Country}</p>
          <p className="description">{Actor.Description}</p>
        </div>
      </div>
    </div>
  );
}

export default Actor;
