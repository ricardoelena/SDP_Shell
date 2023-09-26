//remenber to run npm init -y

function getHeaders() {
    return {
        "Accept": "application/vnd.appgate.peer-v19+json",
        "content-type": "application/json",
        "authorization": "Bearer eyJjbGFpbXNUb2tlbiI6ImV5SmhiR2NpT2lKU1V6VXhNaUlzSW5wcGNDSTZJa1JGUmlJc0luUjVjQ0k2SWtwWFZDSjkuZUp5dFdGY1RxOXgxL1N0MzdpdWZURytlK1I0UUhkRUVpSmJ4QXgxRUZSMDgvdTlCMTA3aVpNYXhKNU0zT0ZwYlo1ZDE5dG1MUC8rYyt6cnI1UFRuSDM5bU5KeFRXVTdmSUNnamJsZ2NKYmNZU2VrYlJzRllqTkU0Z1NiSXo5OStWdE8wWkY4OEFpSG9EYUp2Q09GQTZCOFI5SThROUFlY0ptbUNvbWtvdkpEWlBsUmpOdjBWaXQwZzlJWmdmd2ZGRUlLNjBNZ1htbGJUWEhYRlVrMWxsdXBSbTExR3JQNDdpa0E1bGxNUml0SXhodWNSbGNjMGhDTTBsa1p4bXNiNWJ4ZG16SnFzaTM0elhyOHozSGZUTGhtUFljNVN0b21xOXRyOHp6K0g2R2o2Nk90eWt3RjMxRC9uejl1RmtRckVSRzIxMWtRSkxyczZPMzZCazc2Yng3NXBzdkhDcDJQeXlzem1lanQxeXQ4MEdjNnhtTE9lY3k3SytNbW16enNaVW13dlpheDRiN05nT0JFOWFpUzJkTFBLUjd2WUtTZmVJaFdESUhEZ1lYV29jNnpERzIzQ3RyVGZCTVlRTzZHQXBLeFpjY0oxN0tZVzdwT2w5SFo4N3M4bi9vSzlncml2Y1JBYWR1TklTSUNDNDZQMmcxeDZPVW92cFNTeHh0NFRmSXFydjJmR1BYY09PdFcxK3pKa1dWL0I1RnE4bDZDZ3hiSE1WdWg5SWxtZGU0UUkwdTZxMVVmY296YmcwQVQwRGhRTUttVm1QbmtEdFFSL2ZnTDUvY1B0TkJ4MEpFU1BCTDI3bVhxZUprTUZ3T0V6WWpDUUwyWE9CTXNzVFRSTUtjOGFkYWsvcVNEQlA4K2RGZmpwZE55VHlEZHMzclRXQTlHd0Q0Yk95WVI2SzNBRzFaOTVRS29wSTBwY1pCUHFoK09SYkVVTGFIV0Zndkh4bElteGc1UmFLQVNhK2o3Wnl6dWVEc0I0bmZaZ2pIY3hoVzBXN1RJQlpWNW5SckJGS1pQb0hvenkwM3pyNXFQVmZhc1FPY25iSitTSkx1Vkd4WWZpTE0vM0M5VG1FSDJHVUYwK3RPUUZjNHJTdWNnSmlvdldreXkrS2NpMldBQldYbEVPK2toeGlqOVpIbDZsOE9wcERqMG5WbE80bXZ6b3duR1RPTngra2xaY0I5NFF3aDNoUmZheVprUHcrTmc5QWNNUUE5aVFwelpWeGZOaEpyeVJhL01Wa3k4bXRvUXN0SjRjNXNoaGcyQVAxQjFyajhkQlByWEZjUWJic0JpOFAzUmJSOS82S1VZQkhjbUI1aUNWYStrdzBiaXd1Qzh2NnVNVEJZY1VaTy9rempTOGZOUnNZeUhBOCttVjB1N3o5KzhwU2pDTVJPRDRsa1lVZE1PeU5MNUZKRTNlb2hUTGNoUkJjaWlETDFaSHFRNUhSN2dEZ3I4NW50K05Zekw0TmNzaG5DRGtWU05FeHowR0U4WTZUUWVWVDE3c24waWZMancwYXF6QnBQN2lUdXlEOERNMUp5YkhxSU5Nc29PejZRTFJxRHBNWTByRjJiTmFFdmdVYlQrdUQ3NmxIZ2hhamI1U0ZxRFNWR1NVZ3J1NXV6SENWQnp0NnRod2Z1UmJlQ0xpd1Q5czlSVTZHdU9jbjJMcG1GR21sV0dmNWpOdldFc3JzdUEwN3J1T2EybXIxQXFXeEFna0FwYkwzMUVyWCs3VEFrYmxBN1p0SE1QOUp6T1ZHTmFnT3BmMkk2bEg0NXJyODhzWHJ4bzdhd0I3QnN5bG1xd1dvb0t2c2o2dGcwazNRVTZXaUxtSnBoL1JpV0lzSXNuekFqTndJdFJiUW0rcUx4U2JsL0h6N3RFWEwzc0YyTVV1YlJ5NlpVb1dBVUd1Z1B1cTFUTFBjSkJ3YmFQeVhxL1JPbURBcHdIdXJBb0x6eUZpdENjTFFxcVpiTnJ6VWJJVzZrcUNaOTdkajdTejFDSnNKMWNTQnRxVkV2SlpxeDVnOFlpbDVETzB0U0xtTm1vOHRXYVpaWFIxc0QydVFpRXk0WE5ZTjlISTVNYm1EcFNwM1dyOUNHVk5xZWI4aHQ1QzdoQ3dDRzREeGF0M3c2bUJNRWRUWVE3SEdIdjBYSmkxRHdQM2VNUmJWcENCMUtkTmlUS0UyZVM1NWR5aFNZWUxoRHhkQ1VnSVMwKzVGOHo3U2NXeDY3QWJyRTJLZ2VnZ3BmTmRjeVFiUWVvOUlNbElzTjhIdXhMYVBkVHlnc2R3Ym5sNlFDRHp4NXZ3WTdwVzlBYkE3L0JneVVuQnZ2VVpKTVk3Uyt6MnF6OVZEMEJpMGlpTWxwMFNNeGJUdmlTWjZ4ckpvQytyODV5bXN6VEtiMUdjSWRlOWxOQzNLRWZJV3daUlJKWmVsd0pDNUJlcmE3Y1d2Q05oMjJNNlFpMU1sMUpOcDRoNnpzWUpnZXE3cTZSTnpIWDJFUVVIcGVWVHZpTkhjcEdlYlBtZVB4d1hsOFd0NEZVN3JOZysyZnNQSytBdmhIampIQXo3dThOM3ZrTHh1T21FeUpqRDJ5czI2eEp3QllVb2FxWVNqWlpKaFE4ckc0SGhsTWpudEFFbHNFTU40NUJsSGF3SEtXNVdtSFN1S0daWk53RXJrWnJsaEFCZ1c3MlcrT0xraENTbFkwT1F4aEoxclBiMFl1cHFicjJBMGNUM2lBelJxM1BKYXp1YWlhd0prR1g0OGFmY0Rkd3BPWFFlRHNqdndRckNuRDNXS3lZalFoblp0NjRUVi9jRGtmTGp4WCtXaEM5WCtMT0tYcHgwTmVGbGUzU0crUU5qclBHRnk2Qy9kdzk2cktZanVWZll4MDZ6UHNrZng5a3BZYlZhVWhtZWl4ZldUOFQwTWwyNzNFOGNDcnFxYStSTjZJdDJvNFg4blY0V0gyTU1Ta2RHSFRnTHRWZ29XcEpzRGF0NTRwQmJyUTlmOFVzMWRKV0ZYcy9WQVE1cnpNd1BscHNvc3haTGxIS1ZTUFdCV3BESjYzNlBac1o3ZzU0bkN3Z21Wc1IwdDVkUWVXN1lIU21tdHMvZ1hRRW53cUJKNElnYWZsbnJnYVJIQjBsRHVRYVVLRWtkZ2MwNVJzQXA1MVdUUUVSYndhVEpnS1J4aVB4dWNIYzZhY0daL2Z1a2pKMkhtNkl0V2FhSVRRbE0wQ1NLOEV0cFppQUZKZzNlVmNHeE9Xbjg1cFNkUXlidGZLdXFFaDVtVXpyOWFiUUNwNHVLU3czbVRDVUdTRFNRc3RoNFBGNXpCU1NhblVlWVFhb1Izc3M5eHV6VW5obUJwR1dnNE1YVlZlVDQxVzFmVmxOMGhNVklIdDF3bE1odUdFYVF0NWpHMHh1T3d4QkpZUlNKNStqRjZ0V0NQQkhsTkc4ZUJWSE9wYXpRbUhzYUZCWGxkMUlNZ25Sd2lMSzNqZ2VmeGE2WnowaW8rTVVtdkVmRW9HTzQ4M3ZiVUN2MGZScVpjTzh0dHNzV0NOeElZUnplQ1VzM0QxOTI3QmNpNGp6MFBZbGhpRys4cDNyaFNCVW9saklaNENPenpDMXRZSHpDNERHUTZ3Sm9ReU43TytTRjdEdldaZDBaWHFkcEJDS3dUVjc2Zm9aNEhtN2M0VXpxc3dWM2R5cEF1TTJ4YmkxMmh3bU91SmJxNThwUCtMdXVXNmE1bWcxb2dWZHJFaDhUem81UUwwTjJXUVEyNFNCSGg0K2pEWXZhRENjMmN3Vkw5MmJ6UVJxSDVxNHN6RGJUUVVZQk5LTitpRzMrbUsyZVVPQ05JN3dXM05qcXV2RXJhUVpFa3pCc1p4d1FoenFRRExidzBRU1FvQzdvU0xJbkZnbHdMWS9MT2hZbHdLaDNobndNYkN6cmlMQkVYZ0szVndNc0lkdzJUVW1zM3NXeTBvZmF6eDdWZnZEQk9zcGt3NkVJS1ZEekdpeXVpZWR6U3Z3R0FVZkJXQ0pUVW8zNmVQVVduZTBHWnJXZnFrU1RkR1Q1MFZUVW5kVjVaZThXc1ZrY3psYzcvSGhMSXU0OVVBSEVaTUc5R2hBM0tJSlZ2aDhsSkVKSW5PUFVweEg0YkFxbHVaY21Ud1pOa0xsdnlHNWk3NlMwNHlDT3FMUmVwRlR5MUk4eURuZ014WUIwYjRJM3RhWXVjV3piTVByRDFLL21zeDZobzJOYzNoeWVpY0RSdTBCTWlpNTFFWmxyZGRYWjBvNVhQQkxGYlA4Z0tJWmhNeXR2WFBUVnpRQXdocFcrbVlBVUU0cGZraEJxQUUrWHhNdTNaKzdSaGk4V3ZiWkc2YVg5bDlVeEdxTVpqdEUzQ2tvdURZRWcyYVVob09pV3B3Z0JVVm1FSkFSMHNWckwzL2tic3d2cm5ub3E1dUtqckM4dmdJRjNLeWtiVEIrSjFiK3ZHenRlUXc2bUhwcVYxREZQTnVGOTU3c2NYa2M2WENJamFURTNHaUVsRm56NFBXL2pUS3pNWHBmaWMrWnM3V1BCYm5INjZmSHNEQ21lazZMbzFOS0RGSXhsaHlsNk9YS0RmRVNFajl0c3F3QVpHTTU0bFRqWTVGeU9hNkdOb2tSYm1Oa2swc2hkbUt4Z3g4d2t5ejRmWGYzZ29iVmxraW9ySHhkUGRFRUR6T2J3cGRvWDBJVGFTSmF5ZDBvaG8weC9lM3JiUHhUNytiSWJIcDVUZnB6ZnJpemlGaWtqMGZLb1FCWGxoMGhqRjd5Kys2VmozWXVkTk1kWGJwVW1zdXAxaDIwdDBRZUpqY1ZuWDUrZFMzeFMzZGtrMlVWdGR4dndhclN2UWI3SFlyendzTW5meGhRSnFWMk8rZGZqWmRGQW1oZHY2VTdFRVl1cnNqc3FJaTRLSGFOdnNVcHpLQ2ZKMWNsaW02aGUwL0NnanVESjJwQjFKMkg4WGl6WUVXMzBwS2d5SXlsbk1lNGoyckh6dE1XWldWRENtZUVkamlBaHc1Y0JaTXNBRzZxTE5mbkFtRkNFTWVUSU9vZlRCdlhlY0UyNWQ1YkNQcThrQVQ4dmdQNTBnUGxHcTN1enk1YW43cDNTM3NIQzNsSGo3UjNkRGlSNzVPd0h0RW1ReHVHWmFVMnF6N0NrT0w1emNtWFdkRmNvN2hwMWRjYmV3bGRLbGVXRHZlYjgyS3hDMTZLQXUzcnZYUzNoeXMrZHg0UmdhNHdYR0VQaDQ5eXNRd3cyVHNCS0swQ2tqV29mRCtZTlJzclRuRjBuSzZ4UWVjVG1ZSnBxOFhJL2hISkpqN0xxbEVSQ1hCTUU1L1Y0aGp5djFyLy8vTXRmZnZzNVhHS3kreTlGbVZmak5QOU5wbHBWRW8xcGY1Ry9pZjV6a2Y5cTBtc3BLcjd3S3MyNnVab1BjK3pYNjNuOEcraVhYdjMvVTc1cHRsWko5a3ZLLzRmMTdXdCsrOXJmdm45dysvdC8rRXI1LytIWEwxc0l6V01jSWFrYlNjRFlEY3V6NUJaZFIvY0d4K2wxSitSNUNxSDRaYnRNMmRqOTFkMi8rdkh6U2xNeDlzdHdaZWpmdmlISXp0ZkoxNFdiZnVQWTM0Y29xYnQrL2o2T1ZmTE4xL1dyK0RYNFlmWk5sUncvMkRHTDVuNzhZV3pkMSthZkduTjllMVhsQjVPMlZmY3Z3UGx1enNiaEduV3lmOW5FVHNxc2pmNWwrQy9jVmMveEc4WXYvSDJwbXF1OC96aUVyS3V5OUlkbGNPd1BNNXFtclIrdnQyeTQ4aEhOVmQvOStKV2cvM1huUDEyVjcvNlc4cjl4OFFmemh4Ky9HUGpQREtQQ1RzYnErN1hrMTNlU2Zyb0V6bFZSQlAvdDU1V24rcnM0SmYxM0NiM0EwNVJOVTN0UjVxcTU0SExWRk1WTjl1dDQvRGNTL3g5OStSTHFGd0Z4bEtacElrNXZPWkZjS3BaQ0wvSkNLWGJMWUlqS1NSSzdEZ1gxandqNFhmeHJTRjhXL3Vrdi93NlJlU2tuLlNQR0RhRnFhOXhteXhGVklNNU11dUJRbFBYR3E1QmYxN3dTK0pzc1hmOTlYa3Bjd2tPYTdnSzJvc1RFcE5IR3pOWWRVeWlUZ0QxdTllT0ZJc0RJWXJCL0ZBOWlBajBSOW1mSkFEK2FNdUlWbHE5RHNENW5INUNqaG4xcW93OUljVCtzNHNWdXJCdjlFZ1BXSTByNzkxTk1iTmY3TlM5VVZTbXFUZGg5YlpHSG1QWkFVbkdkY0t3c0lOZzF1N3hVeFR5dnFFRVljMUZDTUZDbTYzQ0hFbm4wUnZTQ1pGNHRiYTM1Z0F0NXVORk1GV0hYb1Q2OU9HZ2E1N21pd1Z1NVlxK01IMnJ5bUI0YjdPMHNxTG9McE9veFY2RXE1NGdManRxaGsyZm4wRG0wQ2NjZkNoQWZ5WGlKb3RhTE02aXYyNmxDMkJ5Y1dFMG90RndRUHk4dHRCMnpJSGphb1pNTFhHQ1NJa0taMEsvbGlhdGJRN1J3aGxKcGZPUnN3RGJxNkxPKzFCajhpT2Z4M0M4b2ZpYVJieElzeW1odWZES3A5dTBRejIvU3pxSWlnQmZGMmhzdTUyYmh3ZzdJWmVVTUUrcjJZUHRhdFUvVXpHSElFY0JGRWt6QWZGU1VKT05nSFd4UUw0aFVPWXZTeGxQdVR5YjB6TXN1aWliVHgwRC80WXVzZUNhQVVSV0JJeFp6ZjJBdHVCR1lhZzlDNVAyTjM0WlRrdU1iaTZZY2RnNlIwU2JBWnlQd2ZyVTdlRGxIWTd2dTJDUzVmZ1d5bkFmZUJ5b2xTbHVjRFVTRkFmUUhXaFljNGY4Q3lMUERCUEdBRWtPU0JPdWRRbWZXVDNuNHJ3WTlDcnRoL3JrVWpNeFhCR1dXSE9RMDFkdzErV3ZPeWx5bVNmMjROUU40PSIsImFkbWluaXN0cmF0aW9uVG9rZW4iOiJleUpoYkdjaU9pSlNVelV4TWlJc0lucHBjQ0k2SWtSRlJpSXNJblI1Y0NJNklrcFhWQ0o5LmVKeFZrTWxxQXpFUVJIOGw2QnlGMWpJYWFXNCs1aHlmRW56UTBtT0VaME9TUTh6Z2Y0OFVRaGI2MGsyOUtvcmVTVmt2dUR3SE1oRFU0SHNKSFFYUkNTcDFzTlF3N3loM2ZCUWRNeXhvVGg1SnpQbUtqZWZBQlFWRHVUcUNHTGdZQUo0VUY3MW1uUGV2bGNTUExTYk1mOUgrUDlvcnJXVkQvV1RqbkkrL1hRd2JOWTZHQXFDaTBsbFBIUSttdG1MU1NkTXA0VnVYdEU0dC8yMG5zYmtjMk9DOEF0cGprSlF4bE5SSlcwTTBBQWZ3eGlwVlhZdWRzZEl2dDF4d2ZqaUVPUzR4bDJSTFhKY3FieW0reHduUDM4bmx0alg2TUUxVkt6YWRzZnljMmE5TjNJbXQ1MURTRmV0L1F2T2RHbnYrMnU3M1U1MVBsMUZtOUE9PS5JVGVKZVRQN01YT2x3ZVUzamR6WE5OYUk1NDVLK200REU5bWI3SkkzM0F4citpd1Qzd29xQ0RadGQ3dXhaU2hWYVVjbC9uWEJXS2NmY2pkbERDYWxMalRWeHNkOFIyWUJYZ0lBSlJQczFBZzVjRllnd24rNkx2RUNKYkIxOG92cGZ6TjNQSkZNNGw3cGY3TkJsb1BTS3BTdDRGeTJrOWpMRjJ1Y29xNmsybGgwOGs1MXVSd0dXQ25PWXNhRVNyWGRJU3VmV0V2QUtUY1M2OVBEeDdmV2R1cmF5Tm5ZcThOVW5QcGVFcVZsSkx4cHIzTGlBTTBKbFFub2M1T2xZYStRMEljaDA2OXFDcFdtUHY0WVdqR0hmc2NnRDBmZHNTWTY4L0I3b0NjR3N4Z1prenJjMndVR3lJdCtIcElvT2d4RDZ3c09FNG80VElHaWl4aTBmLzMwNHhuMGxwK0tXNnUxeUdhM2dJcnpZblByR2lkbXlkN2lzUE9MV2JvdUIzNGdHYTVtWnRzN2tzN29Mci9ua2F3KzFWS21mS0pzK3VaanUxMFhjNnVHd2tEdGhDVTVBM3RlWnFjTmpLSG5ZZDVLdWxUK0JwQXc3UVVOOU1KUE85azVmVlFuajc5aVQzdEZKRmJNOWdUWDkvYVZubEdhR0gzcHM1OUwvUjRIYVZaKzN5TUVCZnIrOVpXV2JkbFpOaTM3NzVDS1piVGE5Q3NSTGowejRuOXArWW42QkV2SzNNYmtsdGNCMmRRREJQVzR6d2k4anJyWkxjWXh0TjBUUUhRQUp4WkpKK1FsRXJaaWd3Y2NqUHhEaFFqNGxWT0pGNW9RODZ5V3dweXhFWHU1L1QyNHpNaUEweXpQanhLZWg0RU0vcDRzdXlJT0ttNVUxbHgva08xOHU0UT0ifQ=="
    }
}

async function myAsyncFunction() {
// IP Pool Sizing

/*
MIT License

Copyright (c) 2023 Appgate Cybersecurity, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

//Get Max entitled user license count
let userLicenses; //Carrying the license information

fetch("https://ricoctl.packnot.com:8443/admin/license", {
    method: "GET",
    headers: getHeaders()
})
    .then(response => response.json())
    .then(result => {
        userLicenses = result.entitled.maxUsers;
    })
    .catch(error => console.log('error', error));


const fetchOptions = { headers: getHeaders() };

const configuration = {
  idps: await fetch("https://ricoctl.packnot.com:8443/admin/identity-providers", fetchOptions).then(response => response.json()).then(json => json.data),
  ippools: await fetch("https://ricoctl.packnot.com:8443/admin/ip-pools", fetchOptions).then(response => response.json()).then(json => json.data),
  appliances: await fetch("https://ricoctl.packnot.com:8443/admin/appliances", fetchOptions).then(response => response.json()).then(json => json.data)
}

let ctlcount = 0; //Controller count
let description = ""; //Calculation response if the combination of IdP and IP Pool can handle the load of devices
let poolCheck = [];  //Analysis result

configuration.appliances.forEach(appliance => {
  if (appliance.controller.enabled === true){
    ctlcount +=1 //Counter increases in case there are multiple controllers
  }
})

configuration.ippools.filter(pool => pool.total > 1).forEach(pool => {
  let ipsReq = {
    idps: configuration.idps.filter( idp => idp.type != "Connector" && idp.type != "ServiceDatabase" && idp.ipPoolV4 == pool.id )
    .map(idp => idp.name + "," + idp.deviceLimitPerUser)}
  
  if (ipsReq.idps[0]){
    const ipsNeeded = ipsReq.idps.reduce((sum, item) => {
      const [, value] = item.split(',');
      return sum + parseInt(value, 10);
    }, 0);
    
    ////
    
    if (Number(((ipsNeeded*userLicenses)*ctlcount))> Number(pool.total)){ //Check if IP Pool can handle the combination of Limit Devices in IdP, User Licenses and amount of controllers 
        description = "** Not enough IPs in the IP Pool [" + pool.name + "] assigned to IdP [" + ipsReq.idps.map(item => item.split(',')[0]) + "]"
      }else{
        description = "-- IdP [" + ipsReq.idps.map(item => item.split(',')[0]) + "] with [" + pool.name + "] can handle the load"
      }
    
    poolCheck.push({ //Information Gathering
      "IpPool": pool.name, 
      "IdPs and Devices allow per User": ipsReq.idps,
      "Total Device Per User": ipsNeeded,
      "Controller Count": ctlcount,
      "User Licenses": userLicenses,
      "IPs Needed for HA with Controller": ipsNeeded*userLicenses*ctlcount,
      "Total IPs in Pool": pool.total,
      "Description": description });
    
    ////
  }
})
console.log(poolCheck)
}

myAsyncFunction().then(result => {
  console.log(result); // Outputs: "Hello"
});
