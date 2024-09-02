import { useMemo, useRef } from "react";
import { stringifyUrl } from "query-string";

export interface SesInternalEmbedDemoFormData {
  spaceId: string;
  token: string;
}

export const useSesInternalEmbedDemo = ({
  spaceId,
  token,
}: SesInternalEmbedDemoFormData): {
  kibanaUrl: string;
  iframeRef: React.MutableRefObject<HTMLIFrameElement>;
} => {
  // 内网域名按此规则拼接
  const internalUrl = useMemo(
    () => `https://${spaceId}-internal.kibana.qcloudes.com:443`,
    [spaceId]
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentAppIdRef = useRef("discover");

  // 注意，里面不能直接更新url，会导致整个kbn页面重新加载
  // 切换appid通过api调用，内部会自己更新路由
  // 更新token的场景则通过 reload({ showLoading: true }) 来刷新
  const kibanaUrl = useMemo(() => {
    if (!spaceId) return "";

    let path = internalUrl;

    if (spaceId) {
      path += `/s/${spaceId}`;
    }

    // 可自行设置需要访问的app，默认访问 'discover'
    if (currentAppIdRef.current) path += `/app/${currentAppIdRef.current}`;

    path = stringifyUrl({
      url: path,
      query: { sl__t: token },
    });

    return path;
  }, [internalUrl, spaceId, token]);

  return {
    kibanaUrl,
    iframeRef,
  };
};
