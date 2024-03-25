# 트레이딩 봇 업데이트 방법

트레이딩 봇 데스크탑 앱은 데스크탑 클라이언트(Tauri + React)와 로컬 백그라운드에서 동작하는 Fast API 애플리케이션을 함께 패키징한 프로그램입니다.

---

## Fast API 코드 수정 & 배포 방법

1. 기존 trading_bot_backend 레포지토리의 README.md를 참조하여 기능 추가를 진행합니다.
2. 기능 추가를 완료했다면 작업 내용을 commit 이후 main 브랜치에 push 합니다.
3. main 브랜치에 코드가 push 되면 프로젝트 루트 디렉토리/.github/workflows/build-binaries.yml 스크립트가 실행됩니다.
   1. 빌드 및 패키징 진행 상황은 Github 레포지토리 페이지의 Actions 탭에서 확인 가능합니다.
   2. 스크립트는 아래의 순서로 작업을 진행합니다.
      1. Pyinstaller를 사용하여 Fast API 애플리케이션을 하나의 바이너리 파일로 패키징합니다. 이때 만들어지는 파일 이름은 .github/workflows/build-binaries.yml 스크립트에 정의된 양식대로 생성됩니다. 현재 파일 이름 규칙은 '{깃허브 액션 id}-main-Windows.exe' 입니다.
      2. 패키징된 바이너리 파일의 릴리즈를 생성합니다. 이때 릴리즈는 자동으로 release 페이지에 게시됩니다.
   3. 패키징 & 배포 작업은 보통 5분 정도 소요됩니다.
4. 릴리즈 페이지에 바이너리 파일 배포가 완료되었다면 '데스크탑 클라이언트 코드 수정 & 배포 방법' 항목을 참조해서 업데이트 파일을 배포합니다.

---

## 데스크탑 클라이언트 코드 수정 & 배포 방법

1. 기존 trading_bot_client 레포지토리의 README.md를 참조하여 기능 추가를 진행합니다.
2. 기능 추가를 완료했다면 작업 내용을 commit 이후 main 브랜치에 push 합니다.
3. main 브랜치에 코드가 push 되면 프로젝트 루트 디렉토리/.github/workflows/build.yml 스크립트가 실행됩니다.
   1. 빌드 및 패키징 진행 상황은 Github 레포지토리 페이지의 Actions 탭에서 확인 가능합니다.
   2. 스크립트가 실행되기 전에 레포지토리 설정 페이지에서 Repository secrets 변수들을 추가해야합니다. secrets 변수들은 다음과 같습니다.
      - BACKEND_REPO_OWNER: 패키징된 Fast API 애플리케이션 릴리즈가 게시된 레포지토리 owner의 닉네임 입니다. 여기서는 seungdori를 입력하면 됩니다.
      - GH_PAT: Fast API 애플리케이션 릴리즈가 게시된 레포지토리 권한을 가진 토큰입니다. 이전에 백엔드 레포지토리를 옮겨드릴때 발급한 토큰을 입력하면 됩니다. 해당 토큰은 최대 유효 기간이 **1년** 입니다. 토큰 만료일이 다가오면 토큰을 재발급 받고 GH_PAT 변수를 업데이트 해야합니다. 토큰 재발급시 Fast API 레포지토리의 권한을 추가해주세요.
      - TAURI_PRIVATE_KEY: 데스크탑 클라이언트를 빌드할때 필요한 key 입니다.
      - TAURI_KEY_PASSWORD: 데스크탑 클라이언트를 빌드할때 필요한 비밀번호 입니다.
   3. 코드가 아니더라도 아무 파일이나 commit 이후 push 하면 build.yml 스크립트가 실행됩니다.
   4. 코드 수정이 필요 없고 Fast API 바이너리 파일만 새로 번들링 하고 싶다면, Actions 탭에서 가장 최신 job을 재시작합니다.
   5. 스크립트는 아래의 순서로 작업을 진행합니다.
      1. GH_PAT 토큰을 사용하여 최신 버전 릴리즈 파일을 external/backend/ 디렉토리에 다운로드합니다.
      2. 다운로드한 바이너리 파일 이름을 backend로 수정합니다.
      3. 데스크탑 클라이언트(Tauri + React) 애플리케이션 빌드합니다.
         1. TAURI_PRIVATE_KEY와 TAURI_KEY_PASSWORD를 검증합니다.
         2. 다운로드한 backend 바이너리 파일 이름을 플랫폼에 맞게 수정합니다. (e.g. backend.exe)
         3. 클라이언트 소스코드를 빌드합니다.
         4. 빌드된 클라이언트와 backend 바이너리 파일 패키징합니다.
      4. 패키징된 클라이언트 설치 파일 (업데이트 파일)을 릴리즈 페이지에 게시합니다.
         - src-tauri/tauri.conf.json 파일의 "version"을 수정하지 않았다면 최신 릴리즈 페이지의 파일들이 대체됩니다.
         - src-tauri/tauri.conf.json 파일의 "version"을 수정했다면 최신 파일이 **draft** 모드로 릴리즈 페이지에 게시됩니다. draft 모드일때는 구버전의 데스크탑 클라이언트가 실행되어도 자동 업데이트 팝업창이 나타나지 않습니다. draft 모드를 release 모드로 변경하면, 다음 실행부터 자동 업데이트 팝업창이 나타납니다. draft 모드 -> release 모드 변경은 release 페이지에서 수동으로 해주셔야합니다.
      5. 패키징 & 배포 작업은 보통 10분 정도 소요됩니다.

---
