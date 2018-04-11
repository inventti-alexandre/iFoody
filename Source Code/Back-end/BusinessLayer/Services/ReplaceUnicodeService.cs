using System;
using System.Text;

namespace BusinessLayer.Services
{
    public static class ReplaceUnicodeService
    {
        private static string[] VietNamChar = new string[]
        {
            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
        };
        public static string ReplaceUnicode(string strInput)
        {
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                {
                    strInput = strInput.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
                }
            }
            return Utf8ToAscii(strInput).Replace("?", " ");
        }

        public static string Utf8ToAscii(string text)
        {
            try
            {
                System.Text.Encoding utf8 = System.Text.Encoding.UTF8;
                Byte[] encodedBytes = utf8.GetBytes(text);
                Byte[] convertedBytes =
                        Encoding.Convert(Encoding.UTF8, Encoding.ASCII, encodedBytes);
                System.Text.Encoding ascii = System.Text.Encoding.ASCII;

                return ascii.GetString(convertedBytes);
            }
            catch
            {
                return text;
            }
        }
    }
}
