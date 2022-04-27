module.exports = function (code, mail) {
  return `
<div style="margin: 0; padding: 0" dir="ltr" bgcolor="#ffffff">
  <table
    border="0"
    cellspacing="0"
    cellpadding="0"
    align="center"
    id="m_-1397021225352913201email_table"
    style="border-collapse: collapse"
  >
    <tbody>
      <tr>
        <td
          id="m_-1397021225352913201email_content"
          style="
            font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana, arial,
              sans-serif;
            background: #ffffff;
          "
        >
          <table
            border="0"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="border-collapse: collapse"
          >
            <tbody>
              <tr>
                <td height="20" style="line-height: 20px" colspan="3">&nbsp;</td>
              </tr>
              <tr>
                <td height="1" colspan="3" style="line-height: 1px"></td>
              </tr>
              <tr>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
                <td>
                  <table
                    border="0"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="border-collapse: collapse"
                  >
                    <tbody>
                      <tr>
                        <td height="15" style="line-height: 15px" colspan="3">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          width="32"
                          align="left"
                          valign="middle"
                          style="height: 32; line-height: 0px"
                        >
                          <img
                            src="data:image/png;base64,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"
                            width="32"
                            height="32"
                            style="border: 0"
                            class="CToWUd"
                          />
                        </td>
                        <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
                        <td width="100%">
                          <span>Heimat</span>
                        </td>
                      </tr>
                      <tr style="border-bottom: solid 1px #e5e5e5">
                        <td height="15" style="line-height: 15px" colspan="3">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
                <td>
                  <table
                    border="0"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="border-collapse: collapse"
                  >
                    <tbody>
                      <tr>
                        <td height="20" style="line-height: 20px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            class="m_-1397021225352913201mb_text"
                            style="
                              font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
                                arial, sans-serif;
                              font-size: 16px;
                              line-height: 21px;
                              font-weight: bold;
                              color: #141823;
                            "
                          >
                            <font size="4">Mã bảo mật Heimat của bạn</font>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td height="15" style="line-height: 15px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            class="m_-1397021225352913201mb_text"
                            style="
                              font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
                                arial, sans-serif;
                              font-size: 16px;
                              line-height: 21px;
                              color: #141823;
                            "
                            >Xin chào,
                            <p></p>
                            <div>
                              Mã bảo mật của bạn là:
                              <p></p>
                              <table
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                style="border-collapse: collapse"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        font-size: 11px;
                                        font-family: LucidaGrande, tahoma, verdana, arial,
                                          sans-serif;
                                        padding: 10px;
                                        background-color: #f2f2f2;
                                        border-left: none;
                                        border-right: none;
                                        border-top: none;
                                        border-bottom: none;
                                      "
                                    >
                                      <span
                                        style="
                                          font-family: Helvetica Neue, Helvetica, Lucida Grande,
                                            tahoma, verdana, arial, sans-serif;
                                          font-size: 22px;
                                          line-height: 36px;
                                          font-weight: bold;
                                          letter-spacing: 5px;
                                          margin-left: 20px;
                                          margin-top: 20px;
                                          margin-bottom: 20px;
                                          margin-right: 20px;
                                        "
                                        >${code}</span
                                      >
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p></p>
                              Để xác nhận danh tính của bạn trên Heimat, chúng tôi cần xác minh địa
                              chỉ email của bạn. Hãy dán mã này vào trình duyệt. Đây là mã dùng một
                              lần. <br /><br />
                              Nếu bạn không yêu cầu mã nào, có thể ai đó đang cố truy cập vào tài
                              khoản của bạn.
                              <a href="#" target="_blank"
                                >Bạn có thể đổi mật khẩu để bảo vệ tài khoản của mình</a
                              >.
                            </div>
                            <p></p
                          ></span>
                        </td>
                      </tr>
                      <tr>
                        <td height="15" style="line-height: 15px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            class="m_-1397021225352913201mb_text"
                            style="
                              font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
                                arial, sans-serif;
                              font-size: 16px;
                              line-height: 21px;
                              color: #141823;
                            "
                            ><p>Cảm ơn bạn!<br />Đội ngũ bảo mật của Heimat</p></span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td height="15" style="line-height: 15px">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
                <td>
                  <table
                    border="0"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    align="left"
                    style="border-collapse: collapse"
                  >
                    <tbody>
                      <tr style="border-top: solid 1px #e5e5e5">
                        <td height="19" style="line-height: 19px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          style="
                            font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
                              arial, sans-serif;
                            font-size: 11px;
                            color: #aaaaaa;
                            line-height: 16px;
                          "
                        >
                          Tin nhắn này được gửi tới
                          <a
                            href="mailto:${mail}"
                            style="color: #3b5998; text-decoration: none"
                            target="_blank"
                            >mail</a
                          >
                          theo yêu cầu của bạn.<br />Duy Platforms, Inc., Attention: Community
                          Support, 13 Heimat
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="15" style="display: block; width: 15px">&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td height="20" style="line-height: 20px" colspan="3">&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <span
            ><img
              src="data:image/png;base64,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"
              style="border: 0; width: 1px; height: 1px"
              class="CToWUd"
            />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

`;
};
