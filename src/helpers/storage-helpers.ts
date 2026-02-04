import supabaseDBConfig from "@/config/supabase-db-config";

export const uploadFileAndGetURL = async (file: File) => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `profiles/${fileName}`;
    const { data, error } = await supabaseDBConfig.storage
      .from("basic")
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    // get public URL of the uploaded file
    const downloadUrlResponse = supabaseDBConfig.storage
      .from("basic")
      .getPublicUrl(filePath);
    
    return {
      success: true,
      data: downloadUrlResponse.data.publicUrl,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
