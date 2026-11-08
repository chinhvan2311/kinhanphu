/* =====================================================================
   DATA.JS  –  Toàn bộ dữ liệu mẫu của template (dễ chỉnh sửa tại 1 nơi)
   1) COMPANY : thông tin công ty (lấy từ kinhhopphongsach.com)
   2) IMG     : danh sách LINK ẢNH (hotlink). Thay link tại đây là đổi toàn site.
   3) CATEGORIES / PRODUCTS / PROJECTS / NEWS : nội dung mẫu
   ===================================================================== */

const COMPANY = {
  brand: 'AN PHÚ MIRROR',           // <- đổi tên thương hiệu / logo chữ tại đây
  brandSub: { vi: 'Gương & Kính Công Nghệ', en: 'Mirror & Glass Technology' },
  name: {
    vi: 'Công ty TNHH Sản Xuất và Phát Triển Công Nghệ An Phú',
    en: 'An Phu Technology Production and Development Co., Ltd.'
  },
  address: {
    vi: '75 Nguyên Hồng, phường Hạnh Thông, TP. Hồ Chí Minh, Việt Nam',
    en: '75 Nguyen Hong Street, Hanh Thong Ward, Ho Chi Minh City, Vietnam'
  },
  factory: {
    vi: 'Nhà máy: C15/8k9 KCN Vĩnh Lộc, Vĩnh Lộc, Bình Chánh, TP. Hồ Chí Minh',
    en: 'Factory: C15/8k9 Vinh Loc Industrial Park, Binh Chanh, Ho Chi Minh City'
  },
  hotlines: ['(+84) 93 874 8979', '(+84) 931 434 234', '(+84) 286 686 4589'],
  email: 'kinhhopphongsach@gmail.com',
  zalo: '0938748979',
  mapQuery: '75 Nguyên Hồng, Hạnh Thông, Hồ Chí Minh'
};

/* ---------------------------------------------------------------------
   IMG – HOTLINK ẢNH (không tải về).
   - Ảnh "bolenmirror.com" lấy trực tiếp từ website Bolen.
   - Ảnh sản phẩm BOLEN khác lấy từ các gian hàng bán sản phẩm BOLEN (Shopee/Alibaba).
   - Ảnh CNC/nhà máy lấy từ website nhà cung cấp thiết bị kính.
   Lưu ý: link bên thứ ba có thể bị đổi/chặn -> ảnh dự phòng sẽ tự hiện (xem main.js).
   Khi có ảnh thật của công ty: chỉ cần thay URL bên dưới.
   --------------------------------------------------------------------- */
const IMG = {
  /* --- LED / nhà tắm --- */
  ledOval:      'https://mxmmffwntosvwaviippd.supabase.co/storage/v1/render/image/public/product-images/products/1779440819615-dfvi5yj.jpg?width=1000&resize=contain',
  ledOval2F5:   'https://down-ph.img.susercontent.com/file/sg-11134202-821d5-mgiwmes0hv6700',
  ledRunway:    'https://down-ph.img.susercontent.com/file/sg-11134201-8225k-mhjvjdtqg7icb0',
  americanLED:  'https://down-ph.img.susercontent.com/file/sg-11134201-7reqk-m86uigqwnhkwd7',
  roundLED:     'https://s.alicdn.com/@sc04/kf/Hb5e72aba905a460799983467e8bc5047G.jpg_960x960q80.jpg',
  smartBT:      'https://image.made-in-china.com/2f0j00RkFbeMIKPyqm/Illuminated-Smart-LED-Mirror-Frameless-Bathroom-Lighting-with-Blue-Tooth.jpg',
  framedBath:   'https://img.alicdn.com/imgextra/i2/356573532/O1CN01aaWiin1bxhaZYTvD9_!!356573532.jpg',
  cabinetSmart: 'https://down-ph.img.susercontent.com/file/sg-11134201-7reog-m86lkzd4wbl575',
  cabinetIrr:   'https://bolenmirror.com/media/product-images/products/1781674321314-kv377q9.jpg',
  irregular:    'https://bolenmirror.com/media/product-images/products/1783924026806-szqnpzy.jpg',
  irregular2:   'https://www.hzwmirror.com/wp-content/uploads/2024/01/irregular-mirror-9.jpg',
  /* --- Gương toàn thân --- */
  fbWood:       'https://down-ph.img.susercontent.com/file/sg-11134201-7reno-m857mwg8r25e39',
  fbFrameless:  'https://down-ph.img.susercontent.com/file/sg-11134201-821ex-mh01cf9p98gd1c',
  fbArch:       'https://down-ph.img.susercontent.com/file/sg-11134201-7rd64-m77rrk6capkh4a',
  fbFrench:     'https://down-ph.img.susercontent.com/file/sg-11134201-7rd5u-m6obii2qul8b38',
  fbLED:        'https://down-sg.img.susercontent.com/file/sg-11134201-7rast-mb24gsw3yxqoed',
  fbNordic:     'https://down-my.img.susercontent.com/file/sg-11134201-7reoq-m1ya1mjxhi8wd7',
  /* --- Phòng khách / phòng ăn / treo tường --- */
  fbRetro:      'https://gw.alicdn.com/imgextra/i2/60190028/O1CN01h5GCie1C4rm64Ysec_!!60190028.jpg_640x640q90.jpg',
  fbCeiling:    'https://gw.alicdn.com/i4/356573532/O1CN01v4TlZW1bxhxA58PzL_!!4611686018427380060-0-item_pic.jpg_640x640q90.jpg',
  fbAmEu:       'https://gw.alicdn.com/imgextra/i1/356573532/O1CN01WtRMId1bxhowzfRtu_!!356573532.jpg_640x640q90.jpg',
  fbWabi:       'https://gw.alicdn.com/i2/356573532/O1CN01HiDyHQ1bxhrUYKktd_!!356573532.jpg_640x640q90.jpg',
  fbLuxury:     'https://gw.alicdn.com/i3/60190028/O1CN01pm0Jke1C4s03zpkUg_!!60190028.jpg_640x640q90.jpg',
  diningA:      'https://img.alicdn.com/imgextra/i2/57247/TB27pyUmcrI8KJjy0FhXXbfnpXa_!!57247.jpg',
  diningB:      'https://img.alicdn.com/imgextra/i1/57247/TB227vrmjnD8KJjSspbXXbbEXXa_!!57247.jpg',
  /* --- Gia công CNC / nhà máy --- */
  cnc1:         'https://newwayglass.com/cdn/shop/files/Edging2.jpg?v=1717145492&width=1600',
  cnc2:         'https://www.mirrormanufacturer.com/wp-content/uploads/2026/06/Mirror-glass-cutting-process-with-size-drawing-material-preparation-and-automated-cutting-line.jpg',
  cnc3:         'https://site.cdnfile.io/www.glass-processingmachinery.com/14a3ba082ec61a8da68ca899d3f20d69.webp',
  cnc4:         'https://image.made-in-china.com/2f0j00mZNqpJacPeks/Full-Automatic-Fast-Glass-Mirror-Grinding-Polishing-Edging-Cutting-and-Beveling-CNC-Machine.jpg',
  cnc5:         'https://newwayglass.com/cdn/shop/files/1711863840902_04e45e9e-bd28-476b-9a16-39744383d4f5.jpg?v=1718099281&width=1482',
  cnc6:         'https://www.macglastech.com/uploads/images/202207/20220706/7828f54d07a531b7a1824758847b9e77.jpg'
};

const CATEGORIES = [
  { id: 'bathroom', img: 'framedBath',  icon: 'drop' },
  { id: 'led',      img: 'ledOval',     icon: 'sun' },
  { id: 'fullbody', img: 'fbArch',      icon: 'ruler' },
  { id: 'makeup',   img: 'ledOval2F5',  icon: 'star' },
  { id: 'wall',     img: 'irregular',   icon: 'layers' },
  { id: 'room',     img: 'fbCeiling',   icon: 'award' }
];

/* Sản phẩm mẫu – tên/mô tả/thông số là NỘI DUNG MẪU, chưa phải dữ liệu thật của công ty */
const SIZES = {
  bathroom: ['60×80 cm', '70×90 cm', '80×100 cm', '100×120 cm'],
  led:      ['50×70 cm', '60×80 cm', '70×90 cm', '80×100 cm', 'Ø60 cm', 'Ø80 cm'],
  fullbody: ['50×150 cm', '60×160 cm', '70×170 cm', '80×180 cm'],
  makeup:   ['40×60 cm', '50×70 cm', 'Ø50 cm', 'Ø60 cm'],
  wall:     ['60×90 cm', '70×100 cm', '80×120 cm'],
  room:     ['60×160 cm', '80×180 cm', '90×190 cm']
};

const PRODUCTS = [
  { id: 'led-round-01', cat: 'led', code: 'AP-L101', led: true, shape: { vi: 'Tròn', en: 'Round' },
    name: { vi: 'Gương LED tròn viền nhôm 3 màu ánh sáng', en: 'Round Aluminum-Frame LED Mirror, 3-Color Light' },
    short: { vi: 'Đèn nền LED, cảm ứng chạm, chống đọng sương, điều chỉnh 3000K–6000K.', en: 'Backlit LED, touch switch, anti-fog, dimmable 3000K–6000K.' },
    imgs: ['roundLED', 'ledOval', 'smartBT'], hot: true },
  { id: 'led-oval-02', cat: 'led', code: 'AP-L102', led: true, shape: { vi: 'Oval', en: 'Oval' },
    name: { vi: 'Gương LED oval viền acrylic trắng', en: 'Oval LED Mirror with White Acrylic Frame' },
    short: { vi: 'Thiết kế oval mềm mại, ánh sáng dịu, phù hợp phòng tắm khách sạn & căn hộ.', en: 'Soft oval design with gentle light — ideal for hotel and apartment bathrooms.' },
    imgs: ['ledOval', 'ledOval2F5', 'roundLED'], hot: true },
  { id: 'led-rect-03', cat: 'led', code: 'AP-L103', led: true, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương LED chữ nhật không khung, cảm ứng chống mờ', en: 'Frameless Rectangular LED Mirror, Touch & Anti-Fog' },
    short: { vi: 'Treo ngang hoặc dọc, đèn LED IP44, bộ sưởi chống mờ gương tích hợp.', en: 'Horizontal or vertical mounting, IP44 LED, built-in demister.' },
    imgs: ['ledRunway', 'americanLED', 'framedBath'], hot: true },
  { id: 'bath-frame-04', cat: 'bathroom', code: 'AP-B201', led: false, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương nhà tắm khung nhôm bo góc', en: 'Rounded-Corner Aluminum-Frame Bathroom Mirror' },
    short: { vi: 'Khung nhôm chống gỉ, kính bạc 5mm chống nổ, treo tường chắc chắn.', en: 'Rust-proof aluminum frame, 5mm safety silver glass, secure wall mounting.' },
    imgs: ['framedBath', 'americanLED', 'ledRunway'] },
  { id: 'bath-cabinet-05', cat: 'bathroom', code: 'AP-B202', led: true, shape: { vi: 'Tủ gương', en: 'Mirror cabinet' },
    name: { vi: 'Tủ gương nhà tắm đèn LED có kệ chứa đồ', en: 'LED Bathroom Mirror Cabinet with Storage' },
    short: { vi: 'Tủ gương thông minh, nhiều ngăn tiện dụng, đèn LED viền và chống mờ.', en: 'Smart mirror cabinet with practical storage, edge LED and anti-fog.' },
    imgs: ['cabinetSmart', 'cabinetIrr', 'ledRunway'], hot: true },
  { id: 'bath-organic-06', cat: 'bathroom', code: 'AP-B203', led: true, shape: { vi: 'Dáng tự do', en: 'Organic shape' },
    name: { vi: 'Gương nhà tắm dáng tự do đèn nền LED', en: 'Organic-Shape Backlit LED Bathroom Mirror' },
    short: { vi: 'Đường cong hữu cơ, cắt CNC theo bản vẽ, có thể tuỳ chỉnh kích thước.', en: 'Organic curves, CNC-cut to drawing, custom sizes available.' },
    imgs: ['irregular', 'irregular2', 'cabinetIrr'] },
  { id: 'fb-arch-07', cat: 'fullbody', code: 'AP-F301', led: false, shape: { vi: 'Vòm', en: 'Arch' },
    name: { vi: 'Gương soi toàn thân dáng vòm treo tường / đứng sàn', en: 'Arched Full-Length Mirror, Wall-Mount or Floor-Standing' },
    short: { vi: 'Kính chống nổ, đứng tựa tường hoặc treo, phù hợp phòng ngủ và shop thời trang.', en: 'Shatterproof glass, lean or hang — for bedrooms and fashion stores.' },
    imgs: ['fbArch', 'fbFrench', 'fbWabi'], hot: true },
  { id: 'fb-wood-08', cat: 'fullbody', code: 'AP-F302', led: false, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương toàn thân khung gỗ chân đế', en: 'Wood-Frame Full-Length Mirror with Stand' },
    short: { vi: 'Khung gỗ tự nhiên phong cách ấm áp, chân đế vững, nhiều màu gỗ.', en: 'Natural wood frame, stable stand, multiple wood tones.' },
    imgs: ['fbWood', 'fbRetro', 'fbAmEu'] },
  { id: 'fb-led-09', cat: 'fullbody', code: 'AP-F303', led: true, shape: { vi: 'Vòm', en: 'Arch' },
    name: { vi: 'Gương toàn thân đèn LED viền cảm ứng', en: 'Full-Length LED Mirror with Touch Light' },
    short: { vi: 'Đèn LED viền ba chế độ, soi rõ từng chi tiết trang phục.', en: 'Three-mode edge LED reveals every outfit detail.' },
    imgs: ['fbLED', 'fbFrench', 'fbArch'], hot: true },
  { id: 'fb-frameless-10', cat: 'fullbody', code: 'AP-F304', led: false, shape: { vi: 'Không khung', en: 'Frameless' },
    name: { vi: 'Gương toàn thân không khung mài cạnh', en: 'Frameless Full-Length Mirror, Polished Edge' },
    short: { vi: 'Mài cạnh tinh tế, tối giản, phù hợp mọi phong cách nội thất.', en: 'Refined polished edge, minimalist, fits any interior style.' },
    imgs: ['fbFrameless', 'fbWood', 'fbNordic'] },
  { id: 'makeup-smart-11', cat: 'makeup', code: 'AP-M401', led: true, shape: { vi: 'Oval', en: 'Oval' },
    name: { vi: 'Gương trang điểm LED thông minh có đồng hồ', en: 'Smart LED Makeup Mirror with Digital Clock' },
    short: { vi: 'Hiển thị giờ & nhiệt độ, ánh sáng đều chuẩn trang điểm, cảm ứng một chạm.', en: 'Shows time & temperature, even make-up lighting, one-touch control.' },
    imgs: ['ledOval2F5', 'smartBT', 'ledOval'], hot: true },
  { id: 'makeup-round-12', cat: 'makeup', code: 'AP-M402', led: true, shape: { vi: 'Tròn', en: 'Round' },
    name: { vi: 'Gương trang điểm tròn treo tường đèn LED', en: 'Round Wall-Mounted LED Makeup Mirror' },
    short: { vi: 'Viền đèn LED bao quanh, nhiệt độ màu điều chỉnh được, gọn gàng cho bàn phấn.', en: 'Surrounding LED ring, adjustable colour temperature, neat for vanity tables.' },
    imgs: ['roundLED', 'ledOval2F5', 'smartBT'] },
  { id: 'wall-organic-13', cat: 'wall', code: 'AP-W501', led: false, shape: { vi: 'Dáng tự do', en: 'Organic shape' },
    name: { vi: 'Gương treo tường dáng tự do nghệ thuật', en: 'Artistic Organic-Shape Wall Mirror' },
    short: { vi: 'Biến tấu hình khối độc đáo, điểm nhấn trang trí cho tường nhà.', en: 'Unique silhouettes — a decorative accent for any wall.' },
    imgs: ['irregular', 'irregular2', 'fbWabi'], hot: true },
  { id: 'wall-arch-14', cat: 'wall', code: 'AP-W502', led: false, shape: { vi: 'Vòm', en: 'Arch' },
    name: { vi: 'Gương treo tường vòm khung nhôm', en: 'Arched Aluminum-Frame Wall Mirror' },
    short: { vi: 'Phong cách Pháp thanh lịch, khung nhôm mảnh, màu vàng / đen / bạc.', en: 'Elegant French style, slim aluminum frame in gold, black or silver.' },
    imgs: ['fbFrench', 'fbArch', 'fbWabi'] },
  { id: 'room-dining-15', cat: 'room', code: 'AP-R601', led: false, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương trang trí phòng ăn khung đen', en: 'Black-Frame Dining Room Decorative Mirror' },
    short: { vi: 'Nhân đôi không gian bàn ăn, phản chiếu ánh sáng tự nhiên.', en: 'Visually doubles the dining area and bounces natural light.' },
    imgs: ['diningA', 'diningB', 'fbAmEu'] },
  { id: 'room-living-16', cat: 'room', code: 'AP-R602', led: false, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương phòng khách ốp tường toàn thân', en: 'Wall-to-Ceiling Living Room Mirror' },
    short: { vi: 'Mở rộng không gian phòng khách, đế gỗ vững chãi, lắp đặt nhanh.', en: 'Opens up the living room with a sturdy wood base and quick install.' },
    imgs: ['fbCeiling', 'fbLuxury', 'fbNordic'], hot: true },
  { id: 'room-retro-17', cat: 'room', code: 'AP-R603', led: false, shape: { vi: 'Chữ nhật', en: 'Rectangle' },
    name: { vi: 'Gương phòng khách khung gỗ phong cách retro', en: 'Retro Wood-Frame Living Room Mirror' },
    short: { vi: 'Khung gỗ đặc, hoàn thiện thủ công, tạo chiều sâu cho phòng khách.', en: 'Solid wood frame with hand-finished detail that adds depth to the living room.' },
    imgs: ['fbRetro', 'fbWabi', 'fbLuxury'] }
];

const PROJECTS = [
  { id: 'p1', type: 'hotel',     img: 'ledOval',     title: { vi: 'Khách sạn 4 sao – 120 phòng', en: '4-Star Hotel – 120 Rooms' },        meta: { vi: 'Gương LED nhà tắm • TP.HCM', en: 'LED bathroom mirrors • HCMC' } },
  { id: 'p2', type: 'apartment', img: 'americanLED', title: { vi: 'Căn hộ cao cấp – 300 căn', en: 'Premium Apartments – 300 Units' },  meta: { vi: 'Gương nhà tắm & toàn thân • Bình Dương', en: 'Bathroom & full-length mirrors • Binh Duong' } },
  { id: 'p3', type: 'retail',    img: 'fbFrench',    title: { vi: 'Chuỗi cửa hàng thời trang', en: 'Fashion Retail Chain' },             meta: { vi: 'Gương toàn thân dáng vòm • Toàn quốc', en: 'Arched full-length mirrors • Nationwide' } },
  { id: 'p4', type: 'spa',       img: 'irregular',   title: { vi: 'Spa & Salon cao cấp', en: 'Luxury Spa & Salon' },                  meta: { vi: 'Gương dáng tự do đèn LED • Đà Nẵng', en: 'Organic LED mirrors • Da Nang' } },
  { id: 'p5', type: 'apartment', img: 'fbCeiling',   title: { vi: 'Biệt thự phố – Phòng khách', en: 'Townhouse Living Room' },       meta: { vi: 'Gương ốp tường • TP.HCM', en: 'Wall-to-ceiling mirror • HCMC' } },
  { id: 'p6', type: 'hotel',     img: 'cabinetSmart',title: { vi: 'Resort ven biển', en: 'Beachfront Resort' },                       meta: { vi: 'Tủ gương LED • Phú Quốc', en: 'LED mirror cabinets • Phu Quoc' } },
  { id: 'p7', type: 'retail',    img: 'cnc3',        title: { vi: 'Showroom nội thất', en: 'Furniture Showroom' },                    meta: { vi: 'Gia công gương theo bản vẽ • Hà Nội', en: 'Drawing-based custom mirrors • Hanoi' } },
  { id: 'p8', type: 'spa',       img: 'ledOval2F5',  title: { vi: 'Phòng makeup studio', en: 'Makeup Studio' },                   meta: { vi: 'Gương trang điểm LED • TP.HCM', en: 'LED makeup mirrors • HCMC' } }
];

const NEWS = [
  { id: 'n1', cat: 'guide', img: 'ledRunway',  date: '2026-11-02',
    title: { vi: 'Cách chọn gương LED nhà tắm: kích thước, nhiệt độ màu và chuẩn chống nước', en: 'How to Choose an LED Bathroom Mirror: Size, Colour Temperature & Waterproofing' },
    ex: { vi: 'Hướng dẫn nhanh 5 tiêu chí giúp bạn chọn đúng gương LED cho phòng tắm gia đình và khách sạn.', en: 'A quick 5-point guide to choosing the right LED mirror for homes and hotels.' } },
  { id: 'n2', cat: 'trend', img: 'irregular',  date: '2026-10-24',
    title: { vi: 'Xu hướng gương dáng tự do: đường cong mềm cho không gian hiện đại', en: 'Organic-Shape Mirror Trend: Soft Curves for Modern Spaces' },
    ex: { vi: 'Vì sao gương hữu cơ đang là điểm nhấn trong thiết kế nội thất tối giản.', en: 'Why organic mirrors are becoming the accent of minimalist interiors.' } },
  { id: 'n3', cat: 'tech',  img: 'cnc1',       date: '2026-10-12',
    title: { vi: 'Gia công kính CNC: mài cạnh, vát cạnh và khoan lỗ chính xác đến từng milimét', en: 'CNC Glass Processing: Edging, Bevelling & Drilling to the Millimetre' },
    ex: { vi: 'Tìm hiểu quy trình cắt và mài kính CNC cho gương theo bản vẽ riêng.', en: 'Understand the CNC cutting and edging workflow for drawing-based custom mirrors.' } },
  { id: 'n4', cat: 'guide', img: 'fbWood',     date: '2026-09-30',
    title: { vi: 'Chọn gương toàn thân cho phòng ngủ và shop thời trang', en: 'Choosing a Full-Length Mirror for Bedrooms and Fashion Stores' },
    ex: { vi: 'Kích thước, độ cao và vị trí lắp đặt giúp gương soi đẹp và an toàn.', en: 'Size, height and placement tips for a flattering and safe mirror.' } },
  { id: 'n5', cat: 'tech',  img: 'cnc2',       date: '2026-09-18',
    title: { vi: 'Kính bạc chống nổ 5mm: vì sao nên dùng cho gương nhà tắm', en: '5mm Shatterproof Silver Glass: Why It Matters for Bathroom Mirrors' },
    ex: { vi: 'Phân biệt gương thường và gương chống nổ, chống ăn mòn trong môi trường ẩm.', en: 'Standard vs shatterproof, corrosion-resistant mirrors for humid rooms.' } },
  { id: 'n6', cat: 'trend', img: 'fbCeiling',  date: '2026-09-05',
    title: { vi: 'Dùng gương để mở rộng không gian phòng khách và phòng ăn', en: 'Using Mirrors to Expand Living and Dining Rooms' },
    ex: { vi: 'Những vị trí đặt gương giúp căn phòng sáng và rộng hơn ngay lập tức.', en: 'Mirror placements that instantly make a room brighter and larger.' } }
];
