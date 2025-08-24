// Orval에서 사용할 커스텀 API 인스턴스
export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
  responseType,
  signal,
}: {
  url: string;
  method: string;
  params?: any;
  data?: any;
  headers?: Record<string, string>;
  responseType?: string;
  signal?: AbortSignal;
}): Promise<T> => {
  // 기본 URL 설정
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dev-api.kaiapay.app';

  // URL 구성
  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

  // 쿼리 파라미터 처리
  const queryParams = params ? new URLSearchParams(params).toString() : '';
  const finalUrl = queryParams ? `${fullUrl}?${queryParams}` : fullUrl;

  // 헤더 설정
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // 인증 토큰이 있다면 추가
  if (import.meta.env.VITE_API_TOKEN) {
    defaultHeaders.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
  }

  try {
    const response = await fetch(finalUrl, {
      method,
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답이 비어있는 경우 (DELETE 등)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    // JSON 응답 파싱
    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
};
