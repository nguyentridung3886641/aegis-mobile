# 📘 SỔ TAY TỔNG HỢP KIẾN THỨC TOÀN DIỆN THI FE & PE (AEGIS SYNTHESIS LOG)
**Tác giả:** Trí Dũng & Antigravity  
**Phiên bản:** 2026 Ultimate Offline Edition  
**Đối tượng:** Ôn luyện cấp tốc, tự học trên Điện thoại & Laptop khi không có trợ lý AI trực tiếp.

---

## 🌐 MODULE 1: NWC204 — MẠNG MÁY TÍNH (CISCO CCNA ITN / EOS)

### 1.1. Khung Mô Hình OSI & TCP/IP
- **7 Tầng OSI (Từ dưới lên):**
  1. Physical (Bits, cáp quang, cáp xoắn UTP, sóng RF, Repeater, Hub)
  2. Data Link (Frames, MAC Address 48-bit, Switch, NIC, ARP, LLC/MAC sublayer)
  3. Network (Packets, IP Address 32-bit/128-bit, Router, ICMP, Routing Protocols)
  4. Transport (Segments/Datagrams, Port numbers 16-bit, TCP, UDP, Flow Control)
  5. Session (Quản lý phiên làm việc, thiết lập, duy trì và đóng phiên)
  6. Presentation (Định dạng dữ liệu, nén, mã hóa/giải mã: JPEG, ASCII, SSL/TLS)
  7. Application (Giao tiếp người dùng/ứng dụng: HTTP, HTTPS, DNS, DHCP, FTP, SSH)
- **Đơn Vị Dữ Liệu Giao Thức (PDU):**
  - Data (Tầng 7-5) $\rightarrow$ Segment (Tầng 4) $\rightarrow$ Packet (Tầng 3) $\rightarrow$ Frame (Tầng 2) $\rightarrow$ Bits (Tầng 1).

### 1.2. Công Cụ Chẩn Đoán & Quy Trình Troubleshooting Chuẩn Cisco
- **Ping vs Tracert:**
  - `ping`: Gửi gói tin **ICMP Echo Request (Type 8, Code 0)** thẳng đến IP đích và chờ **ICMP Echo Reply (Type 0, Code 0)**. Đo đạc tính khả dụng (reachability) và thời gian trễ Round-Trip Time (RTT). Ping chỉ phản hồi từ điểm đích (destination reply).
  - `tracert` (trên Windows) / `traceroute` (trên Linux/Cisco): Dò từng chặng (hop-by-hop) bằng thuật toán tăng dần chỉ số **TTL (Time to Live)**:
    - Gói 1: TTL = 1 $\rightarrow$ Router trạm 1 giảm TTL còn 0 $\rightarrow$ Loại bỏ gói và gửi trả thông điệp **ICMP Time Exceeded (Type 11, Code 0)** $\rightarrow$ Máy nguồn ghi nhận IP hop 1.
    - Gói 2: TTL = 2 $\rightarrow$ Đến hop 2 giảm về 0 $\rightarrow$ Gửi ICMP Type 11 $\rightarrow$ Ghi nhận IP hop 2.
    - Lặp lại cho đến khi chạm tới đích cuối.
- **Quy Trình Bottom-Up Troubleshooting (Bắt Buộc Nhớ Đi Thi):**
  - **Bước 1:** Ping Loopback `127.0.0.1` (IPv4) hoặc `::1` (IPv6) $\rightarrow$ Kiểm tra chồng giao thức TCP/IP trên hệ điều hành có hoạt động hay không.
  - **Bước 2:** Ping IP của chính card mạng máy mình $\rightarrow$ Kiểm tra NIC và Driver phần cứng.
  - **Bước 3:** Ping Default Gateway (IP router nội bộ) $\rightarrow$ Kiểm tra kết nối vật lý (cáp LAN, Switch, cấu hình Subnet Mask).
  - **Bước 4:** Ping Server ngoài Internet (vd: `8.8.8.8`) $\rightarrow$ Kiểm tra định tuyến ra ngoài WAN/ISP.
  - **Bước 5:** Ping tên miền FQDN (vd: `google.com`) $\rightarrow$ Kiểm tra dịch vụ DNS.
  > ⚠️ **BẪY ĐI THI:** Nếu đề bài nói "Ping máy khác trong mạng rớt, ping Gateway rớt, hỏi có thể kết luận điều gì chắc chắn?" $\rightarrow$ **Chọn ngay: "Nothing can be determined for sure at this point"** vì kỹ thuật viên chưa hề kiểm tra Bước 1 (ping 127.0.0.1) nên không được phép đoán mò TCP/IP hay NIC bị hỏng!

### 1.3. Tầng Giao Vận (Transport Layer): TCP vs UDP
| Tiêu chí | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Bản chất kết nối** | Hướng kết nối (Connection-oriented) | Phi kết nối (Connectionless) |
| **Độ tin cậy** | Có (Reliable, có ACK, retransmit gói mất) | Không (Unreliable, Best-effort, mất là bỏ) |
| **Bắt tay 3 bước** | SYN $\rightarrow$ SYN-ACK $\rightarrow$ ACK | Không có bắt tay |
| **Đóng kết nối** | 4 bước: FIN $\rightarrow$ ACK $\rightarrow$ FIN $\rightarrow$ ACK | Không cần đóng |
| **Kiểm soát luồng** | Sliding Window (Cửa sổ trượt) | Không có kiểm soát luồng |
| **Header Overhead** | 20 bytes (lên tới 60 bytes với options) | 8 bytes cố định |
| **Ứng dụng tiêu biểu**| HTTP/HTTPS, FTP, SSH, SMTP | DNS (query), DHCP, VoIP, TFTP, Video live |

### 1.4. An Toàn Mạng (Network Security Traps)
- **Man-in-the-middle (MitM):** Kẻ tấn công chặn giữa đường truyền của 2 đầu cuối ("compromise of data between two end points") để nghe lén (eavesdropping) hoặc chỉnh sửa dữ liệu (tampering). Thường thực hiện qua ARP Poisoning hoặc Rogue DHCP.
- **Denial of Service (DoS / DDoS):** Đánh vào tính **Khả dụng (Availability)** bằng cách làm ngập lụt băng thông (SYN Flood, UDP Flood, Smurf) khiến hệ thống quá tải, không can thiệp vào tính bí mật hay toàn vẹn dữ liệu giữa 2 đầu cuối.
- **Phishing:** Lừa đảo người dùng cung cấp thông tin nhạy cảm qua email/website giả mạo.

---

## 🖥️ MODULE 2: OSG202 — NGUYÊN LÝ HỆ ĐIỀU HÀNH (OPERATING SYSTEMS)

### 2.1. Tiến Trình (Process) vs Tiểu Trình (Thread)
- **Process:** Chương trình đang được thực thi, có không gian địa chỉ riêng biệt độc lập (Address Space: Text/Code, Data, BSS, Heap, Stack). Được quản lý bởi Khối quản lý tiến trình **PCB (Process Control Block)**. Context switch giữa 2 process tốn nhiều chi phí vì phải chuyển đổi không gian bộ nhớ ảo (flushing TLB).
- **Thread:** Đơn vị xử lý nhỏ nhất bên trong một tiến trình (Lightweight Process). Các thread trong cùng process **chia sẻ chung Code, Data, và Heap**, nhưng **mỗi thread có riêng PC (Program Counter), Registers, và Stack**. Quản lý bởi **TCB (Thread Control Block)**.

### 2.2. Lập Lịch CPU (CPU Scheduling)
- **FCFS (First-Come, First-Served):** Non-preemptive, dễ dính **Convoy Effect** (tiến trình dài chạy trước bắt các tiến trình ngắn đợi sau).
- **SJF (Shortest Job First):** Tối ưu nhất về thời gian chờ trung bình (Average Waiting Time). Điểm yếu: Không đoán trước được độ dài CPU burst tiếp theo; dễ gây **Starvation** (đói tài nguyên) cho tiến trình dài.
- **Round Robin (RR):** Preemptive, chia đều lát cắt thời gian (**Time Quantum $q$**).
  - Nếu $q$ quá lớn $\rightarrow$ Trở thành FCFS.
  - Nếu $q$ quá nhỏ $\rightarrow$ Chi phí hoán đổi ngữ cảnh (Context Switching Overhead) chiếm hết thời gian CPU.
- **Priority Scheduling:** Ưu tiên cao chạy trước. Khắc phục nạn đói (Starvation) bằng kỹ thuật **Aging** (tăng dần độ ưu tiên theo thời gian chờ).

### 2.3. Bế Tắc (Deadlock)
- **4 Điều kiện cần của Coffman (Phải xảy ra đồng thời cả 4 điều kiện thì Deadlock mới tồn tại):**
  1. **Mutual Exclusion:** Tài nguyên không thể chia sẻ đồng thời (chỉ 1 tiến trình dùng tại 1 thời điểm).
  2. **Hold and Wait:** Tiến trình đang giữ ít nhất 1 tài nguyên và chờ xin thêm tài nguyên khác đang bị tiến trình khác giữ.
  3. **No Preemption:** Tài nguyên không thể bị cưỡng chế thu hồi giữa chừng; chỉ được giải phóng tự nguyện.
  4. **Circular Wait:** Tồn tại một chuỗi khép kín $P_0 \rightarrow P_1 \rightarrow \dots \rightarrow P_n \rightarrow P_0$.
- **Giải thuật Banker (Banker's Algorithm):** Dùng để **Tránh bế tắc (Deadlock Avoidance)** bằng cách kiểm tra trạng thái an toàn (Safe State).

### 2.4. Quản Lý Bộ Nhớ & Bộ Nhớ Ảo (Virtual Memory & Paging)
- **Phân trang (Paging):** Bộ nhớ vật lý chia thành các **Khung trang (Frames)** có kích thước cố định (thường 4KB). Không gian bộ nhớ logic chia thành các **Trang (Pages)** cùng kích thước.
- **Bảng trang (Page Table):** Chuyển đổi từ Địa chỉ logic (Page number $p$, Offset $d$) sang Địa chỉ vật lý (Frame number $f$, Offset $d$).
- **TLB (Translation Lookaside Buffer):** Bộ nhớ đệm phần cứng tốc độ cao chứa các ánh xạ Page $\rightarrow$ Frame thường dùng. Nếu TLB Hit $\rightarrow$ Truy xuất RAM 1 lần; nếu TLB Miss $\rightarrow$ Phải đọc Page Table trong RAM (mất 2 lần truy xuất RAM).
- **Page Fault:** Xảy ra khi tiến trình truy cập vào trang có bit `valid = 0` (chưa nạp vào RAM, còn nằm trên Swap/Disk). OS sẽ kích hoạt ngắt phần cứng, đọc trang từ đĩa vào một frame trống trong RAM rồi cập nhật bảng trang.

---

## 📐 MODULE 3: MAD101 — TOÁN RỜI RẠC (DISCRETE MATHEMATICS)

### 3.1. Mệnh Đề Logic & Tương Đương Logic
- **Mệnh đề (Proposition):** Là một câu khẳng định có giá trị chân lý hoặc đúng ($T$) hoặc sai ($F$), không thể vừa đúng vừa sai. (Câu hỏi, câu cảm thán, câu chứa biến tự do $x > 5$ không phải mệnh đề).
- **Phép Kéo Theo ($p \rightarrow q$):**
  - Chỉ sai khi $p = T$ và $q = F$. Các trường hợp khác đều đúng.
  - Tương đương: $p \rightarrow q \equiv \neg p \lor q$.
- **Mệnh đề Phản Đảo & Đảo:**
  - Mệnh đề gốc: $p \rightarrow q$
  - Mệnh đề đảo (Converse): $q \rightarrow p$
  - Mệnh đề nghịch (Inverse): $\neg p \rightarrow \neg q$
  - **Mệnh đề phản đảo (Contrapositive):** $\neg q \rightarrow \neg p$ (**Luôn tương đương giá trị chân lý với mệnh đề gốc!**).
- **Quy tắc De Morgan:**
  - $\neg (p \land q) \equiv \neg p \lor \neg q$
  - $\neg (p \lor q) \equiv \neg p \land \neg q$

### 3.2. Lý Thuyết Đồ Thị (Graph Theory)
- **Định lý Bắt Tay (Handshaking Theorem):** Trong mọi đồ thị vô hướng $G = (V, E)$, tổng bậc của các đỉnh bằng 2 lần số cạnh:
  $$\sum_{v \in V} \deg(v) = 2|E|$$
  $\rightarrow$ Hệ quả: Số lượng đỉnh có bậc lẻ luôn là một số chẵn!
- **Chu trình Euler vs Đường đi Euler:**
  - **Đồ thị Euler (Có chu trình Euler):** Đồ thị liên thông và **mọi đỉnh đều có bậc chẵn**.
  - **Đồ thị Nửa Euler (Có đường đi Euler):** Đồ thị liên thông và **chỉ có đúng 2 đỉnh có bậc lẻ** (đường đi bắt đầu từ một đỉnh bậc lẻ và kết thúc tại đỉnh bậc lẻ còn lại).
- **Cây (Tree):** Đồ thị vô hướng liên thông và không có chu trình. Cây có $n$ đỉnh thì luôn có đúng $n - 1$ cạnh: $|E| = |V| - 1$.

---

## ☕ MODULE 4: PRO192 — LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG VỚI JAVA (JAVA CORE & PE)

### 4.1. 4 Trụ Cột Hướng Đối Tượng (OOP Principles)
1. **Encapsulation (Đóng gói):** Khai báo thuộc tính `private`, truy xuất qua `getter` và `setter` công khai để bảo vệ tính toàn vẹn dữ liệu.
2. **Inheritance (Kế thừa):** Tái sử dụng mã nguồn bằng từ khóa `extends`. Lớp con gọi constructor lớp cha bằng `super(...)` ở dòng lệnh đầu tiên.
3. **Polymorphism (Đa hình):**
   - *Đa hình tĩnh (Compile-time):* Method Overloading (Cùng tên, khác tham số trong cùng class).
   - *Đa hình động (Runtime):* Method Overriding (Lớp con định nghĩa lại method của lớp cha với cùng signature).
4. **Abstraction (Trừu tượng):** Ẩn chi tiết cài đặt, chỉ cung cấp giao diện: `abstract class` (có thể chứa biến và hàm có thân) vs `interface` (chỉ chứa khai báo hàm và hằng số `public static final`).

### 4.2. Kỹ Thuật Viết Code Chuẩn FPT PE (Java 7/8 Strict)
- **Sắp xếp tự nhiên (Comparable):**
  ```java
  public class Item implements Comparable<Item> {
      private String name;
      private int price;
      // ...
      @Override
      public int compareTo(Item o) {
          int cmp = this.name.compareToIgnoreCase(o.name);
          if (cmp != 0) return cmp;
          return Integer.compare(this.price, o.price); // Tên bằng nhau thì xếp theo giá tăng dần
      }
  }
  ```
- **Sắp xếp linh hoạt (Comparator):**
  ```java
  Collections.sort(list, new Comparator<Item>() {
      @Override
      public int compare(Item o1, Item o2) {
          return Integer.compare(o2.getPrice(), o1.getPrice()); // Giảm dần
      }
  });
  ```
- **Xử lý chuỗi (Regex & Substring):**
  - Kiểm tra ký tự bắt đầu bằng số: `str.matches("^[0-9].*")`
  - Đảo ngược chuỗi: `new StringBuilder(str).reverse().toString()`
  - Tách từ: `String[] words = str.trim().split("\\s+")`
