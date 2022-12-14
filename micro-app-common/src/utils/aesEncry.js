import CryptoJS from 'crypto-js'
/**
* AES加密 ：字符串 key
*/
export default {
  // 加密
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('dajia8nh6aim3eng')
    const encrypted = CryptoJS.AES.encrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  },
  // 解密
  decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('dajia8nh6aim3eng')
    const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }

}