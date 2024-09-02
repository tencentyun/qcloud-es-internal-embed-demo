import {
  Button,
  Card,
  Form,
  FormInstanceFunctions,
  FormProps,
  FormRules,
  Input,
  Layout,
  Space,
} from "tdesign-react";
import HeadMenu from "tdesign-react/es/menu/HeadMenu";
import { useRef, useState } from "react";

import qcloudIcon from "./assets/qcloud.png";
import FormItem from "tdesign-react/es/form/FormItem";
import {
  SesInternalEmbedDemoFormData,
  useSesInternalEmbedDemo,
} from "./useSesInternalEmbedDemo";

const { Header, Content } = Layout;

function App() {
  const [formData, setFormData] = useState<SesInternalEmbedDemoFormData>({
    spaceId: "",
    token: "",
  });

  const rules: FormRules<SesInternalEmbedDemoFormData> = {
    spaceId: [{ required: true, message: "必填", type: "error" }],
    token: [{ required: true, message: "必填", type: "error" }],
  };

  const form = useRef<FormInstanceFunctions>();

  const onSubmit: FormProps["onSubmit"] = (e) => {
    if (e.validateResult === true) {
      setSubmittedData({ ...formData });
    }
  };

  const [submittedData, setSubmittedData] =
    useState<SesInternalEmbedDemoFormData>({
      spaceId: "",
      token: "",
    });

  const { kibanaUrl, iframeRef } = useSesInternalEmbedDemo(submittedData);

  return (
    <>
      <Layout>
        <Header>
          <HeadMenu
            theme="light"
            logo={<img src={qcloudIcon} height="28" alt="logo" />}
          ></HeadMenu>
        </Header>
        <Content>
          <Card title="腾讯云Elasticsearch Serverless 内嵌内网地址DEMO">
            <Form
              rules={rules}
              ref={form}
              statusIcon={true}
              onSubmit={onSubmit}
            >
              <FormItem label="空间ID" name="spaceId">
                <Input
                  placeholder="请输入空间ID，如：space-xxxxxxx"
                  value={formData.spaceId}
                  onChange={(value) =>
                    setFormData((data) => ({
                      ...data,
                      spaceId: value,
                    }))
                  }
                />
              </FormItem>
              <FormItem label="Token" name="token">
                <Input
                  placeholder="请输入通过 es:DescribeSpaceKibanaTools 获取的 KibanaToken 字段"
                  value={formData.token}
                  onChange={(value) =>
                    setFormData((data) => ({
                      ...data,
                      token: value,
                    }))
                  }
                />
              </FormItem>
              <FormItem style={{ marginLeft: 100 }}>
                <Space>
                  <Button type="submit" theme="primary">
                    访问
                  </Button>
                </Space>
              </FormItem>
            </Form>
          </Card>
          {submittedData.spaceId && submittedData.token && (
            <>
              <div>当前访问地址：{kibanaUrl}</div>
              <iframe
                id="kibana-iframe"
                src={kibanaUrl}
                width="100%"
                height="100%"
                ref={iframeRef}
                allow="clipboard-write"
                style={{ display: submittedData.spaceId ? "block" : "none" }}
              />
              <div>
                使用控制台检索分析需要浏览器支持第三方Cookie，请前往开启，
                <Button
                  onClick={() => {
                    window.open(
                      "https://cloud.tencent.com/document/product/845/100794"
                    );
                  }}
                >
                  设置参考
                </Button>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </>
  );
}

export default App;
