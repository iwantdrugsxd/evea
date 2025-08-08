require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');
const readline = require('readline');

console.log('📁 Google Drive Folder Setup');
console.log('============================\n');

// Check if required environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ Missing required environment variables!');
  console.error('Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env.local file');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setupDriveFolder() {
  try {
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback'
    );

    // Check if we have tokens
    if (!process.env.GOOGLE_ACCESS_TOKEN) {
      console.log('⚠️  No access token found. Please run node get-google-tokens.js first');
      console.log('Then run this script again.');
      rl.close();
      return;
    }

    // Set credentials
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    console.log('🔍 Checking for existing EVEA folder...');

    // Search for existing EVEA folder
    const searchResponse = await drive.files.list({
      q: "name='EVEA Documents' and mimeType='application/vnd.google-apps.folder' and trashed=false",
      fields: 'files(id, name, webViewLink)',
      spaces: 'drive'
    });

    let folderId;
    let folderName = 'EVEA Documents';

    if (searchResponse.data.files.length > 0) {
      // Use existing folder
      folderId = searchResponse.data.files[0].id;
      console.log('✅ Found existing folder:', folderName);
      console.log('📁 Folder ID:', folderId);
      console.log('🔗 Folder Link:', searchResponse.data.files[0].webViewLink);
    } else {
      // Create new folder
      console.log('📝 Creating new folder: EVEA Documents');
      
      const folderMetadata = {
        name: 'EVEA Documents',
        mimeType: 'application/vnd.google-apps.folder',
        description: 'EVEA Marketplace vendor documents and uploads'
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: 'id, name, webViewLink'
      });

      folderId = folder.data.id;
      console.log('✅ Created new folder:', folderName);
      console.log('📁 Folder ID:', folderId);
      console.log('🔗 Folder Link:', folder.data.webViewLink);
    }

    console.log('\n📝 Add this to your .env.local file:');
    console.log('=====================================');
    console.log(`GOOGLE_DRIVE_FOLDER_ID=${folderId}`);
    console.log('=====================================');

    // Test folder access
    console.log('\n🧪 Testing folder access...');
    const testResponse = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
      pageSize: 1
    });

    console.log('✅ Folder access confirmed!');
    console.log(`📊 Folder contains ${testResponse.data.files.length} files`);

    // Create subfolders for different document types
    console.log('\n📁 Creating subfolders for document types...');
    
    const subfolders = [
      'Business Licenses',
      'GST Certificates', 
      'Identity Proofs',
      'Address Proofs',
      'Bank Statements',
      'Aadhar Cards'
    ];

    for (const subfolderName of subfolders) {
      // Check if subfolder exists
      const subfolderSearch = await drive.files.list({
        q: `name='${subfolderName}' and '${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      if (subfolderSearch.data.files.length === 0) {
        // Create subfolder
        const subfolderMetadata = {
          name: subfolderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [folderId]
        };

        await drive.files.create({
          resource: subfolderMetadata,
          fields: 'id, name'
        });

        console.log(`✅ Created subfolder: ${subfolderName}`);
      } else {
        console.log(`✅ Subfolder exists: ${subfolderName}`);
      }
    }

    console.log('\n🎉 Google Drive setup complete!');
    console.log('📁 Main folder ID:', folderId);
    console.log('📋 Add GOOGLE_DRIVE_FOLDER_ID to your .env.local file');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 401) {
      console.error('\n🔧 Token expired. Please run: node get-google-tokens.js');
    } else if (error.code === 403) {
      console.error('\n🔧 Permission denied. Make sure Google Drive API is enabled');
    }
  }

  rl.close();
}

setupDriveFolder();

