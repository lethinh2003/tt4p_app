import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { useEffect } from "react";
import axios from "axios";
const ActiveEmail = () => {
  const router = useRouter();
  const { tokenActiveEmail } = router.query;
  console.log(tokenActiveEmail);
  useEffect(() => {
    if (tokenActiveEmail) {
      checkMailToken();
    }
  }, [tokenActiveEmail]);
  const checkMailToken = async () => {
    try {
      const res = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/users/active-email/${tokenActiveEmail}`
      );
      toast.success(res.data.message);
      window.location.href = "/";
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        window.location.href = "/";
      }
    }
  };
  return (
    <>
      <Layout>
        <h1>Kích hoạt tài khoản</h1>
      </Layout>
    </>
  );
};
export default ActiveEmail;
