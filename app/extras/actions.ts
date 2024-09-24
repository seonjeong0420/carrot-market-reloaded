/**
 * server-only import 받으면,
 * 해당 파일에서 작성한 것을 클라이언트 컴포넌트에서 import 하면 에러 발생한다.
 */
import "server-only";

export function fetchFromAPI() {
  fetch("...");
}
